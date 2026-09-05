// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

import { ALL_PERMISSIONS, DEFAULT_ROLE_TEMPLATES } from "../src/constants/permissions";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding permission catalog...");
  for (const permission of ALL_PERMISSIONS) {
    await prisma.permission.upsert({
      where: { key: permission.key },
      update: { module: permission.module, description: permission.description },
      create: permission,
    });
  }
  console.log(`  -> ${ALL_PERMISSIONS.length} permissions ensured.`);

  console.log("Seeding demo organization...");
  const organization = await prisma.organization.upsert({
    where: { slug: "aurahr-demo" },
    update: {},
    create: { name: "AuraHR Demo Workspace", slug: "aurahr-demo" },
  });
  console.log(`  -> Organization "${organization.name}" (${organization.id})`);

  console.log("Seeding default roles + role-permission assignments...");
  const roleIdBySlug = new Map<string, string>();

  for (const template of DEFAULT_ROLE_TEMPLATES) {
    const role = await prisma.role.upsert({
      where: {
        organizationId_slug: { organizationId: organization.id, slug: template.slug },
      },
      update: { name: template.name, description: template.description },
      create: {
        organizationId: organization.id,
        name: template.name,
        slug: template.slug,
        description: template.description,
        isSystem: true,
      },
    });
    roleIdBySlug.set(template.slug, role.id);

    const permissions = await prisma.permission.findMany({
      where: { key: { in: template.permissionKeys } },
      select: { id: true },
    });

    await prisma.rolePermission.createMany({
      data: permissions.map((p) => ({ roleId: role.id, permissionId: p.id })),
      skipDuplicates: true,
    });

    console.log(`  -> Role "${template.name}" — ${permissions.length} permissions`);
  }

  console.log("Seeding demo Super Admin user...");
  const passwordHash = await bcrypt.hash("Password123!", 12);

  const user = await prisma.user.upsert({
    where: {
      organizationId_email: { organizationId: organization.id, email: "admin@aurahr.dev" },
    },
    update: {},
    create: {
      organizationId: organization.id,
      fullName: "Demo Super Admin",
      email: "admin@aurahr.dev",
      passwordHash,
      status: "ACTIVE",
      emailVerifiedAt: new Date(),
    },
  });

  const superAdminRoleId = roleIdBySlug.get("SUPER_ADMIN")!;
  await prisma.userRole.upsert({
    where: { userId_roleId: { userId: user.id, roleId: superAdminRoleId } },
    update: {},
    create: { userId: user.id, roleId: superAdminRoleId },
  });

  console.log(`  -> User "${user.email}" assigned SUPER_ADMIN`);
  console.log("\nSeed complete. Demo login: admin@aurahr.dev / Password123!");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });