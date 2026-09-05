// src/repositories/user.repository.ts

import type { Prisma, User } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const userRepository = {
  async findByEmailInOrganization(organizationId: string, email: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { organizationId, email, deletedAt: null } });
  },

  /**
   * DOCUMENTED LIMITATION: if the same email exists in more than one
   * organization, this returns the first match by creation order — see
   * Phase 6/13 notes. A future iteration should resolve tenant via
   * subdomain or an org-picker step at login.
   */
  async findByEmailAcrossOrganizations(email: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { email, deletedAt: null }, orderBy: { createdAt: "asc" } });
  },

  async findById(id: string): Promise<User | null> {
    return prisma.user.findFirst({ where: { id, deletedAt: null } });
  },

  async create(
    tx: Prisma.TransactionClient,
    data: { organizationId: string; fullName: string; email: string; passwordHash: string }
  ): Promise<User> {
    return tx.user.create({
      data: {
        organizationId: data.organizationId,
        fullName: data.fullName,
        email: data.email,
        passwordHash: data.passwordHash,
      },
    });
  },

  async recordSuccessfulLogin(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { failedLoginAttempts: 0, lockedUntil: null, lastLoginAt: new Date() },
    });
  },

  async recordFailedLogin(
    userId: string,
    maxAttempts: number,
    lockoutDurationMinutes: number
  ): Promise<{ failedLoginAttempts: number; lockedUntil: Date | null; justLocked: boolean }> {
    const before = await prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { failedLoginAttempts: true },
    });

    const newAttemptCount = before.failedLoginAttempts + 1;
    const willLock = newAttemptCount >= maxAttempts;

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: { increment: 1 },
        lockedUntil: willLock ? new Date(Date.now() + lockoutDurationMinutes * 60 * 1000) : undefined,
      },
      select: { failedLoginAttempts: true, lockedUntil: true },
    });

    return {
      failedLoginAttempts: updated.failedLoginAttempts,
      lockedUntil: updated.lockedUntil,
      justLocked: willLock,
    };
  },

  async updatePasswordHash(userId: string, passwordHash: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash, failedLoginAttempts: 0, lockedUntil: null },
    });
  },

  async markEmailVerified(userId: string): Promise<void> {
    await prisma.user.update({ where: { id: userId }, data: { emailVerifiedAt: new Date() } });
  },
};