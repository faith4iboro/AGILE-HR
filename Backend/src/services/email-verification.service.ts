// src/services/email-verification.service.ts

import type { User } from "@prisma/client";

import { generateSecureToken, hashToken } from "@/lib/auth/tokens";
import { env } from "@/lib/env";
import { ConflictError, InvalidTokenError } from "@/lib/errors";
import { userRepository } from "@/repositories/user.repository";
import { emailVerificationTokenRepository } from "@/repositories/email-verification-token.repository";
import { auditLogRepository } from "@/repositories/audit-log.repository";
import { emailService } from "@/lib/email/email.service";
import type { RequestMeta } from "@/types/auth";

export const emailVerificationService = {
  async issueAndSendVerificationEmail(user: User, meta: RequestMeta): Promise<void> {
    await emailVerificationTokenRepository.invalidateAllForUser(user.id);

    const rawToken = generateSecureToken();
    const tokenHash = await hashToken(rawToken);
    const expiresAt = new Date(Date.now() + env.EMAIL_VERIFICATION_TOKEN_EXPIRES_MIN * 60 * 1000);

    await emailVerificationTokenRepository.create({ userId: user.id, tokenHash, expiresAt });

    const verifyUrl = `${env.APP_URL}/verify-email?token=${rawToken}`;
    await emailService.sendEmailVerificationEmail({ to: user.email, fullName: user.fullName, verifyUrl });

    await auditLogRepository.record({
      organizationId: user.organizationId,
      userId: user.id,
      action: "auth.email_verification.requested",
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
  },

  async verifyEmail(rawToken: string, meta: RequestMeta): Promise<void> {
    const tokenHash = await hashToken(rawToken);
    const record = await emailVerificationTokenRepository.findValidByTokenHash(tokenHash);

    if (!record) {
      throw new InvalidTokenError("This verification link is invalid or has expired.");
    }

    await userRepository.markEmailVerified(record.userId);
    await emailVerificationTokenRepository.markUsed(record.id);

    const user = await userRepository.findById(record.userId);

    await auditLogRepository.record({
      organizationId: user?.organizationId ?? null,
      userId: record.userId,
      action: "auth.email_verification.completed",
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
  },

  async resendVerification(userId: string, meta: RequestMeta): Promise<void> {
    const user = await userRepository.findById(userId);
    if (!user) throw new InvalidTokenError("Account not found.");
    if (user.emailVerifiedAt) throw new ConflictError("This email address is already verified.");

    await this.issueAndSendVerificationEmail(user, meta);
  },
};