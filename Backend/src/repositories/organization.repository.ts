// src/repositories/organization.repository.ts

import type { Prisma, Organization } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const organizationRepository = {
  async findBySlug(slug: string): Promise<Organization | null> {
    return prisma.organization.findFirst({ where: { slug, deletedAt: null } });
  },

  async findById(id: string): Promise<Organization | null> {
    return prisma.organization.findFirst({ where: { id, deletedAt: null } });
  },

  async create(
    tx: Prisma.TransactionClient,
    data: { name: string; slug: string }
  ): Promise<Organization> {
    return tx.organization.create({ data: { name: data.name, slug: data.slug } });
  },
};