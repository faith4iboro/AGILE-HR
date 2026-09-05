// src/repositories/audit-log.repository.ts

import { prisma } from "@/lib/prisma";
import type { AuditLog } from "@prisma/client";

export type AuditAction =
  | "auth.register"
  | "auth.login.success"
  | "auth.login.failure"
  | "auth.login.locked_account_attempt"
  | "auth.logout"
  | "auth.logout_all"
  | "auth.password_reset.requested"
  | "auth.password_reset.completed"
  | "auth.email_verification.requested"
  | "auth.email_verification.completed"
  | "auth.session.revoked"
  | "user.role_assigned"
  | "user.role_revoked"
  | "user.activated"
  | "user.deactivated"
  | "user.suspended";

export interface AuditLogListParams {
  organizationId: string;
  page: number;
  pageSize: number;
  action?: string;
  userId?: string;
}

export interface AuditLogListResult {
  items: AuditLog[];
  total: number;
  page: number;
  pageSize: number;
}

export const auditLogRepository = {
  async record(entry: {
    organizationId?: string | null;
    userId?: string | null;
    action: AuditAction;
    metadata?: Record<string, unknown>;
    ipAddress?: string | null;
    userAgent?: string | null;
  }): Promise<void> {
    await prisma.auditLog.create({
      data: {
        organizationId: entry.organizationId ?? null,
        userId: entry.userId ?? null,
        action: entry.action,
        metadata: entry.metadata as never,
        ipAddress: entry.ipAddress ?? null,
        userAgent: entry.userAgent ?? null,
      },
    });
  },

  /** Always scoped to a single organizationId — no cross-tenant listing exists. */
  async listForOrganization(params: AuditLogListParams): Promise<AuditLogListResult> {
    const where = {
      organizationId: params.organizationId,
      ...(params.action ? { action: params.action } : {}),
      ...(params.userId ? { userId: params.userId } : {}),
    };

    const [items, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (params.page - 1) * params.pageSize,
        take: params.pageSize,
      }),
      prisma.auditLog.count({ where }),
    ]);

    return { items, total, page: params.page, pageSize: params.pageSize };
  },
};