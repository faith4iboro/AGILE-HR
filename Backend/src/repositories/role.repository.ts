import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { DEFAULT_ROLE_TEMPLATES, type SystemRoleSlug } from "@/constants/permissions";

export const roleRepository = {
  async createDefaultRolesForOrganization(
    tx: Prisma.TransactionClient,
    organizationId: string
  ): Promise<Map<SystemRoleSlug, string>> {
    const roleIdBySlug = new Map<SystemRoleSlug, string>();

    for (const template of DEFAULT_ROLE_TEMPLATES) {
      const role = await tx.role.create({
        data: {
          organizationId,
          name: template.name,
          slug: template.slug,
          description: template.description,
          isSystem: true,
        },
      });
      roleIdBySlug.set(template.slug, role.id);

      const permissions = await tx.permission.findMany({
        where: { key: { in: template.permissionKeys } },
        select: { id: true },
      });

      await tx.rolePermission.createMany({
        data: permissions.map((p) => ({ roleId: role.id, permissionId: p.id })),
        skipDuplicates: true,
      });
    }

    return roleIdBySlug;
  },

  async assignRoleToUser(tx: Prisma.TransactionClient, userId: string, roleId: string): Promise<void> {
    await tx.userRole.create({ data: { userId, roleId } });
  },

  async getRolesAndPermissionsForUser(
    userId: string
  ): Promise<{ roles: string[]; permissions: string[] }> {
    const userRoles = await prisma.userRole.findMany({
      where: { userId },
      include: { role: { include: { rolePermissions: { include: { permission: true } } } } },
    });

    const roles = new Set<string>();
    const permissions = new Set<string>();

    for (const userRole of userRoles) {
      if (userRole.role.deletedAt) continue;
      roles.add(userRole.role.slug);
      for (const rolePermission of userRole.role.rolePermissions) {
        permissions.add(rolePermission.permission.key);
      }
    }

    return { roles: [...roles], permissions: [...permissions] };
  },
};