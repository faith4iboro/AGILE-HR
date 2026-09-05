// src/repositories/session.repository.ts

import { prisma } from "@/lib/prisma";
import type { Session } from "@prisma/client";

export const sessionRepository = {
  async create(data: {
    id: string;
    userId: string;
    organizationId: string;
    refreshTokenHash: string;
    userAgent: string | null;
    ipAddress: string | null;
    expiresAt: Date;
  }): Promise<Session> {
    return prisma.session.create({
      data: {
        id: data.id,
        userId: data.userId,
        organizationId: data.organizationId,
        refreshTokenHash: data.refreshTokenHash,
        userAgent: data.userAgent,
        ipAddress: data.ipAddress,
        expiresAt: data.expiresAt,
      },
    });
  },

  async findActiveByTokenHash(refreshTokenHash: string): Promise<Session | null> {
    return prisma.session.findFirst({
      where: { refreshTokenHash, revokedAt: null, expiresAt: { gt: new Date() } },
    });
  },

  /** Deliberately NOT filtered by revoked/expired — used for refresh-token reuse detection. */
  async findAnyByTokenHash(refreshTokenHash: string): Promise<Session | null> {
    return prisma.session.findFirst({ where: { refreshTokenHash } });
  },

  async findActiveById(sessionId: string, userId: string): Promise<Session | null> {
    return prisma.session.findFirst({
      where: { id: sessionId, userId, revokedAt: null, expiresAt: { gt: new Date() } },
    });
  },

  async listActiveForUser(userId: string): Promise<Session[]> {
    return prisma.session.findMany({
      where: { userId, revokedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { lastActiveAt: "desc" },
    });
  },

  async touchLastActive(sessionId: string): Promise<void> {
    await prisma.session.update({ where: { id: sessionId }, data: { lastActiveAt: new Date() } });
  },

  async revokeById(sessionId: string): Promise<void> {
    await prisma.session.updateMany({
      where: { id: sessionId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  },

  async revokeByTokenHash(refreshTokenHash: string): Promise<void> {
    await prisma.session.updateMany({
      where: { refreshTokenHash, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  },

  async revokeAllForUser(userId: string): Promise<number> {
    const result = await prisma.session.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    return result.count;
  },

  async revokeAllForUserExcept(userId: string, keepSessionId: string): Promise<number> {
    const result = await prisma.session.updateMany({
      where: { userId, revokedAt: null, id: { not: keepSessionId } },
      data: { revokedAt: new Date() },
    });
    return result.count;
  },
};