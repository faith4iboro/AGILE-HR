// src/repositories/email-verification-token.repository.ts

import type { EmailVerificationToken } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const emailVerificationTokenRepository = {
  async create(data: { userId: string; tokenHash: string; expiresAt: Date }): Promise<EmailVerificationToken> {
    return prisma.emailVerificationToken.create({
      data: { userId: data.userId, tokenHash: data.tokenHash, expiresAt: data.expiresAt },
    });
  },

  async findValidByTokenHash(tokenHash: string): Promise<EmailVerificationToken | null> {
    return prisma.emailVerificationToken.findFirst({
      where: { tokenHash, usedAt: null, expiresAt: { gt: new Date() } },
    });
  },

  async markUsed(id: string): Promise<void> {
    await prisma.emailVerificationToken.update({ where: { id }, data: { usedAt: new Date() } });
  },

  async invalidateAllForUser(userId: string): Promise<void> {
    await prisma.emailVerificationToken.updateMany({
      where: { userId, usedAt: null },
      data: { usedAt: new Date() },
    });
  },
};