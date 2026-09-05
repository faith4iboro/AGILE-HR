// src/services/auth.service.ts

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { issueSessionTokens } from "@/lib/auth/session-issuer";
import { env } from "@/lib/env";
import { AccountLockedError, AccountInactiveError, ConflictError, InvalidCredentialsError } from "@/lib/errors";
import { organizationRepository } from "@/repositories/organization.repository";
import { userRepository } from "@/repositories/user.repository";
import { roleRepository } from "@/repositories/role.repository";
import { auditLogRepository } from "@/repositories/audit-log.repository";
import { securityEventRepository } from "@/repositories/security-event.repository";
import { emailVerificationService } from "@/services/email-verification.service";
import { SYSTEM_ROLE_SLUGS } from "@/constants/permissions";
import type { AuthenticatedUser, IssuedTokens, RequestMeta } from "@/types/auth";
import type { LoginInput, RegisterInput } from "@/lib/validations/auth";
import type { User } from "@prisma/client";

function toAuthenticatedUser(
  user: User,
  organizationSlug: string,
  roles: string[],
  permissions: string[]
): AuthenticatedUser {
  return {
    id: user.id,
    organizationId: user.organizationId,
    organizationSlug,
    fullName: user.fullName,
    email: user.email,
    status: user.status,
    emailVerified: Boolean(user.emailVerifiedAt),
    roles,
    permissions,
  };
}

export const authService = {
  async register(
    input: RegisterInput,
    meta: RequestMeta
  ): Promise<{ user: AuthenticatedUser; tokens: IssuedTokens }> {
    const existingOrg = await organizationRepository.findBySlug(input.companySlug);
    if (existingOrg) {
      throw new ConflictError("This workspace URL is already taken. Try another one.");
    }

    const existingUser = await userRepository.findByEmailAcrossOrganizations(input.email);
    if (existingUser) {
      throw new ConflictError("An account with this email already exists.");
    }

    const passwordHash = await hashPassword(input.password);

    const { user, organization } = await prisma.$transaction(async (tx) => {
      const organization = await organizationRepository.create(tx, {
        name: input.companyName,
        slug: input.companySlug,
      });

      const user = await userRepository.create(tx, {
        organizationId: organization.id,
        fullName: input.fullName,
        email: input.email,
        passwordHash,
      });

      const roleIdBySlug = await roleRepository.createDefaultRolesForOrganization(tx, organization.id);

      const superAdminRoleId = roleIdBySlug.get(SYSTEM_ROLE_SLUGS.SUPER_ADMIN);
      if (!superAdminRoleId) {
        throw new Error("SUPER_ADMIN role template missing — check permissions.ts");
      }
      await roleRepository.assignRoleToUser(tx, user.id, superAdminRoleId);

      return { user, organization };
    });

    await auditLogRepository.record({
      organizationId: organization.id,
      userId: user.id,
      action: "auth.register",
      metadata: { email: user.email, companySlug: organization.slug },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });

    await emailVerificationService.issueAndSendVerificationEmail(user, meta);

    const authenticatedUser = toAuthenticatedUser(user, organization.slug, [SYSTEM_ROLE_SLUGS.SUPER_ADMIN], []);

    const { permissions } = await roleRepository.getRolesAndPermissionsForUser(user.id);
    authenticatedUser.permissions = permissions;

    const tokens = await issueSessionTokens(authenticatedUser, meta);

    return { user: authenticatedUser, tokens };
  },

  async login(
    input: LoginInput,
    meta: RequestMeta
  ): Promise<{ user: AuthenticatedUser; tokens: IssuedTokens }> {
    const user = await userRepository.findByEmailAcrossOrganizations(input.email);

    if (!user) {
      await auditLogRepository.record({
        action: "auth.login.failure",
        metadata: { emailAttempted: input.email, reason: "no_such_account" },
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
      throw new InvalidCredentialsError();
    }

    if (user.status !== "ACTIVE") {
      await auditLogRepository.record({
        organizationId: user.organizationId,
        userId: user.id,
        action: "auth.login.failure",
        metadata: { reason: "account_not_active", status: user.status },
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
      throw new AccountInactiveError();
    }

    if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
      await auditLogRepository.record({
        organizationId: user.organizationId,
        userId: user.id,
        action: "auth.login.locked_account_attempt",
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
      throw new AccountLockedError();
    }

    const passwordMatches = await verifyPassword(input.password, user.passwordHash);

    if (!passwordMatches) {
      const { failedLoginAttempts, justLocked } = await userRepository.recordFailedLogin(
        user.id,
        env.ACCOUNT_LOCKOUT_MAX_ATTEMPTS,
        env.ACCOUNT_LOCKOUT_DURATION_MIN
      );

      await auditLogRepository.record({
        organizationId: user.organizationId,
        userId: user.id,
        action: "auth.login.failure",
        metadata: { reason: "wrong_password", failedLoginAttempts },
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });

      if (justLocked) {
        await securityEventRepository.record({
          organizationId: user.organizationId,
          userId: user.id,
          type: "ACCOUNT_LOCKOUT",
          severity: "MEDIUM",
          metadata: { failedLoginAttempts },
          ipAddress: meta.ipAddress,
        });
        throw new AccountLockedError();
      }

      if (failedLoginAttempts >= 3) {
        await securityEventRepository.record({
          organizationId: user.organizationId,
          userId: user.id,
          type: "MULTIPLE_FAILED_LOGINS",
          severity: "LOW",
          metadata: { failedLoginAttempts },
          ipAddress: meta.ipAddress,
        });
      }

      throw new InvalidCredentialsError();
    }

    const organization = await organizationRepository.findById(user.organizationId);
    if (!organization) throw new InvalidCredentialsError();

    const { roles, permissions } = await roleRepository.getRolesAndPermissionsForUser(user.id);

    await userRepository.recordSuccessfulLogin(user.id);
    await auditLogRepository.record({
      organizationId: user.organizationId,
      userId: user.id,
      action: "auth.login.success",
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });

    const authenticatedUser = toAuthenticatedUser(user, organization.slug, roles, permissions);
    const tokens = await issueSessionTokens(authenticatedUser, meta);

    return { user: authenticatedUser, tokens };
  },
};