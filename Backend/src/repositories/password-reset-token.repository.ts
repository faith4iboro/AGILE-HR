// src/repositories/password-reset-token.repository.ts

import type { PasswordResetToken } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const passwordResetTokenRepository = {
  async create(data: { userId: string; tokenHash: string; expiresAt: Date }): Promise<PasswordResetToken> {
    return prisma.passwordResetToken.create({
      data: { userId: data.userId, tokenHash: data.tokenHash, expiresAt: data.expiresAt },
    });
  },

  async findValidByTokenHash(tokenHash: string): Promise<PasswordResetToken | null> {
    return prisma.passwordResetToken.findFirst({
      where: { tokenHash, usedAt: null, expiresAt: { gt: new Date() } },
    });
  },

  async markUsed(id: string): Promise<void> {
    await prisma.passwordResetToken.update({ where: { id }, data: { usedAt: new Date() } });
  },

  async invalidateAllForUser(userId: string): Promise<void> {
    await prisma.passwordResetToken.updateMany({
      where: { userId, usedAt: null },
      data: { usedAt: new Date() },
    });
  },
};