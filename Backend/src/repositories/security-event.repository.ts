// src/repositories/security-event.repository.ts

import type { SecurityEvent, SecurityEventType, SecuritySeverity } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export interface SecurityEventListParams {
  organizationId: string;
  page: number;
  pageSize: number;
  severity?: SecuritySeverity;
}

export interface SecurityEventListResult {
  items: SecurityEvent[];
  total: number;
  page: number;
  pageSize: number;
}

export const securityEventRepository = {
  async record(entry: {
    organizationId?: string | null;
    userId?: string | null;
    type: SecurityEventType;
    severity: SecuritySeverity;
    metadata?: Record<string, unknown>;
    ipAddress?: string | null;
  }): Promise<void> {
    await prisma.securityEvent.create({
      data: {
        organizationId: entry.organizationId ?? null,
        userId: entry.userId ?? null,
        type: entry.type,
        severity: entry.severity,
        metadata: entry.metadata as never,
        ipAddress: entry.ipAddress ?? null,
      },
    });
  },

  async listForOrganization(params: SecurityEventListParams): Promise<SecurityEventListResult> {
    const where = {
      organizationId: params.organizationId,
      ...(params.severity ? { severity: params.severity } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.securityEvent.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (params.page - 1) * params.pageSize,
        take: params.pageSize,
      }),
      prisma.securityEvent.count({ where }),
    ]);

    return { items, total, page: params.page, pageSize: params.pageSize };
  },
};