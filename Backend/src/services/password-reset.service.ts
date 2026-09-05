// src/services/password-reset.service.ts

import { hashPassword } from "@/lib/auth/password";
import { generateSecureToken, hashToken } from "@/lib/auth/tokens";
import { env } from "@/lib/env";
import { InvalidTokenError } from "@/lib/errors";
import { userRepository } from "@/repositories/user.repository";
import { passwordResetTokenRepository } from "@/repositories/password-reset-token.repository";
import { sessionRepository } from "@/repositories/session.repository";
import { auditLogRepository } from "@/repositories/audit-log.repository";
import { securityEventRepository } from "@/repositories/security-event.repository";
import { emailService } from "@/lib/email/email.service";
import type { RequestMeta } from "@/types/auth";

export const passwordResetService = {
  async requestPasswordReset(email: string, meta: RequestMeta): Promise<void> {
    const user = await userRepository.findByEmailAcrossOrganizations(email);
    if (!user) return; // always silent — see auth-enumeration notes

    await passwordResetTokenRepository.invalidateAllForUser(user.id);

    const rawToken = generateSecureToken();
    const tokenHash = await hashToken(rawToken);
    const expiresAt = new Date(Date.now() + env.PASSWORD_RESET_TOKEN_EXPIRES_MIN * 60 * 1000);

    await passwordResetTokenRepository.create({ userId: user.id, tokenHash, expiresAt });

    const resetUrl = `${env.APP_URL}/reset-password?token=${rawToken}`;
    await emailService.sendPasswordResetEmail({ to: user.email, fullName: user.fullName, resetUrl });

    await auditLogRepository.record({
      organizationId: user.organizationId,
      userId: user.id,
      action: "auth.password_reset.requested",
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });

    await securityEventRepository.record({
      organizationId: user.organizationId,
      userId: user.id,
      type: "PASSWORD_RESET_REQUESTED",
      severity: "LOW",
      ipAddress: meta.ipAddress,
    });
  },

  async resetPassword(rawToken: string, newPassword: string, meta: RequestMeta): Promise<void> {
    const tokenHash = await hashToken(rawToken);
    const record = await passwordResetTokenRepository.findValidByTokenHash(tokenHash);

    if (!record) {
      throw new InvalidTokenError("This password reset link is invalid or has expired.");
    }

    const passwordHash = await hashPassword(newPassword);
    await userRepository.updatePasswordHash(record.userId, passwordHash);

    await passwordResetTokenRepository.markUsed(record.id);
    await passwordResetTokenRepository.invalidateAllForUser(record.userId);

    const revokedSessionCount = await sessionRepository.revokeAllForUser(record.userId);

    const user = await userRepository.findById(record.userId);

    await auditLogRepository.record({
      organizationId: user?.organizationId ?? null,
      userId: record.userId,
      action: "auth.password_reset.completed",
      metadata: { sessionsRevoked: revokedSessionCount },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
  },
};