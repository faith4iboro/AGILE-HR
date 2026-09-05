// src/lib/auth/permission-checks.ts
// Pure, dependency-free — safe to import from authorize.ts, middleware.ts,
// or a future client component for UX-only conditional rendering.

export interface PermissionCheckable {
  roles: string[];
  permissions: string[];
}

export function hasPermission(subject: PermissionCheckable, permission: string): boolean {
  return subject.permissions.includes(permission);
}

export function hasAnyPermission(subject: PermissionCheckable, permissions: string[]): boolean {
  return permissions.some((permission) => subject.permissions.includes(permission));
}

export function hasAllPermissions(subject: PermissionCheckable, permissions: string[]): boolean {
  return permissions.every((permission) => subject.permissions.includes(permission));
}

export function hasRole(subject: PermissionCheckable, role: string): boolean {
  return subject.roles.includes(role);
}

export function hasAnyRole(subject: PermissionCheckable, roles: string[]): boolean {
  return roles.some((role) => subject.roles.includes(role));
}