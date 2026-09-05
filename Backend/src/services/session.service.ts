// src/services/session.service.ts

import { verifyRefreshToken } from "@/lib/auth/jwt";
import { hashToken } from "@/lib/auth/tokens";
import { issueSessionTokens } from "@/lib/auth/session-issuer";
import { UnauthenticatedError, NotFoundError } from "@/lib/errors";
import { sessionRepository } from "@/repositories/session.repository";
import { userRepository } from "@/repositories/user.repository";
import { organizationRepository } from "@/repositories/organization.repository";
import { roleRepository } from "@/repositories/role.repository";
import { auditLogRepository } from "@/repositories/audit-log.repository";
import { securityEventRepository } from "@/repositories/security-event.repository";
import type { AuthenticatedUser, IssuedTokens, RequestMeta, SessionSummary } from "@/types/auth";

async function buildAuthenticatedUser(userId: string): Promise<AuthenticatedUser> {
  const user = await userRepository.findById(userId);
  if (!user) throw new UnauthenticatedError("Your session is no longer valid.");

  const organization = await organizationRepository.findById(user.organizationId);
  if (!organization) throw new UnauthenticatedError("Your session is no longer valid.");

  const { roles, permissions } = await roleRepository.getRolesAndPermissionsForUser(user.id);

  return {
    id: user.id,
    organizationId: user.organizationId,
    organizationSlug: organization.slug,
    fullName: user.fullName,
    email: user.email,
    status: user.status,
    emailVerified: Boolean(user.emailVerifiedAt),
    roles,
    permissions,
  };
}

export const sessionService = {
  async refresh(
    rawRefreshToken: string | undefined,
    meta: RequestMeta
  ): Promise<{ user: AuthenticatedUser; tokens: IssuedTokens }> {
    if (!rawRefreshToken) throw new UnauthenticatedError("No active session.");

    const claims = await verifyRefreshToken(rawRefreshToken);
    if (!claims) throw new UnauthenticatedError("Your session has expired. Please sign in again.");

    const tokenHash = await hashToken(rawRefreshToken);
    const activeSession = await sessionRepository.findActiveByTokenHash(tokenHash);

    if (!activeSession || activeSession.id !== claims.sid) {
      const anySession = await sessionRepository.findAnyByTokenHash(tokenHash);

      if (anySession && anySession.revokedAt) {
        const revokedCount = await sessionRepository.revokeAllForUser(anySession.userId);

        await securityEventRepository.record({
          userId: anySession.userId,
          type: "SUSPICIOUS_TOKEN_REUSE",
          severity: "HIGH",
          metadata: { sessionsRevoked: revokedCount },
          ipAddress: meta.ipAddress,
        });

        await auditLogRepository.record({
          userId: anySession.userId,
          action: "auth.session.revoked",
          metadata: { reason: "suspected_refresh_token_reuse", sessionsRevoked: revokedCount },
          ipAddress: meta.ipAddress,
          userAgent: meta.userAgent,
        });
      }

      throw new UnauthenticatedError("Your session has expired. Please sign in again.");
    }

    await sessionRepository.revokeById(activeSession.id);

    const user = await buildAuthenticatedUser(claims.sub);
    const tokens = await issueSessionTokens(user, meta);

    await auditLogRepository.record({
      organizationId: user.organizationId,
      userId: user.id,
      action: "auth.session.revoked",
      metadata: { reason: "rotated_on_refresh", oldSessionId: activeSession.id },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });

    return { user, tokens };
  },

  async logout(rawRefreshToken: string | undefined, meta: RequestMeta): Promise<void> {
    if (!rawRefreshToken) return;

    const claims = await verifyRefreshToken(rawRefreshToken);
    const tokenHash = await hashToken(rawRefreshToken);
    await sessionRepository.revokeByTokenHash(tokenHash);

    if (claims) {
      await auditLogRepository.record({
        userId: claims.sub,
        action: "auth.logout",
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
    }
  },

  async logoutAll(userId: string, meta: RequestMeta): Promise<void> {
    const revokedCount = await sessionRepository.revokeAllForUser(userId);

    await auditLogRepository.record({
      userId,
      action: "auth.logout_all",
      metadata: { sessionsRevoked: revokedCount },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
  },

  async listSessions(userId: string, currentSessionId: string): Promise<SessionSummary[]> {
    const sessions = await sessionRepository.listActiveForUser(userId);

    return sessions.map((session) => ({
      id: session.id,
      userAgent: session.userAgent,
      ipAddress: session.ipAddress,
      lastActiveAt: session.lastActiveAt.toISOString(),
      createdAt: session.createdAt.toISOString(),
      isCurrent: session.id === currentSessionId,
    }));
  },

  async revokeSession(userId: string, sessionId: string, meta: RequestMeta): Promise<void> {
    const session = await sessionRepository.findActiveById(sessionId, userId);
    if (!session) throw new NotFoundError("Session not found.");

    await sessionRepository.revokeById(sessionId);

    await auditLogRepository.record({
      userId,
      action: "auth.session.revoked",
      metadata: { reason: "manual_revocation_by_owner", sessionId },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
  },

  async getCurrentUser(userId: string): Promise<AuthenticatedUser> {
    return buildAuthenticatedUser(userId);
  },
};