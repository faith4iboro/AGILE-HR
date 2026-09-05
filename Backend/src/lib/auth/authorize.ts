// src/lib/auth/authorize.ts

import "server-only";

import { getSessionClaims } from "@/lib/auth/current-user";
import {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasRole,
  hasAnyRole,
} from "@/lib/auth/permission-checks";
import { ForbiddenError, UnauthenticatedError } from "@/lib/errors";
import type { AccessTokenClaims } from "@/lib/auth/jwt";

export async function requireAuthenticated(): Promise<AccessTokenClaims> {
  const claims = await getSessionClaims();
  if (!claims) throw new UnauthenticatedError();
  return claims;
}

export async function requirePermission(permission: string): Promise<AccessTokenClaims> {
  const claims = await requireAuthenticated();
  if (!hasPermission(claims, permission)) {
    throw new ForbiddenError(`This action requires the "${permission}" permission.`);
  }
  return claims;
}

export async function requireAnyPermission(permissions: string[]): Promise<AccessTokenClaims> {
  const claims = await requireAuthenticated();
  if (!hasAnyPermission(claims, permissions)) {
    throw new ForbiddenError(
      `This action requires one of the following permissions: ${permissions.join(", ")}.`
    );
  }
  return claims;
}

export async function requireAllPermissions(permissions: string[]): Promise<AccessTokenClaims> {
  const claims = await requireAuthenticated();
  if (!hasAllPermissions(claims, permissions)) {
    throw new ForbiddenError(
      `This action requires all of the following permissions: ${permissions.join(", ")}.`
    );
  }
  return claims;
}

export async function requireRole(role: string): Promise<AccessTokenClaims> {
  const claims = await requireAuthenticated();
  if (!hasRole(claims, role)) {
    throw new ForbiddenError(`This action requires the "${role}" role.`);
  }
  return claims;
}

export async function requireAnyRole(roles: string[]): Promise<AccessTokenClaims> {
  const claims = await requireAuthenticated();
  if (!hasAnyRole(claims, roles)) {
    throw new ForbiddenError(`This action requires one of the following roles: ${roles.join(", ")}.`);
  }
  return claims;
}

export { hasPermission, hasAnyPermission, hasAllPermissions, hasRole, hasAnyRole };