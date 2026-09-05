// src/constants/permissions.ts

export const PERMISSIONS = {
  EMPLOYEE_CREATE: "employee:create",
  EMPLOYEE_READ: "employee:read",
  EMPLOYEE_UPDATE: "employee:update",
  EMPLOYEE_DELETE: "employee:delete",

  DEPARTMENT_CREATE: "department:create",
  DEPARTMENT_READ: "department:read",
  DEPARTMENT_UPDATE: "department:update",
  DEPARTMENT_DELETE: "department:delete",

  ATTENDANCE_READ: "attendance:read",
  ATTENDANCE_MANAGE: "attendance:manage",

  LEAVE_CREATE: "leave:create",
  LEAVE_READ: "leave:read",
  LEAVE_APPROVE: "leave:approve",
  LEAVE_REJECT: "leave:reject",

  PAYROLL_CREATE: "payroll:create",
  PAYROLL_READ: "payroll:read",
  PAYROLL_UPDATE: "payroll:update",
  PAYROLL_APPROVE: "payroll:approve",

  RECRUITMENT_CREATE: "recruitment:create",
  RECRUITMENT_READ: "recruitment:read",
  RECRUITMENT_UPDATE: "recruitment:update",
  RECRUITMENT_DELETE: "recruitment:delete",

  PERFORMANCE_CREATE: "performance:create",
  PERFORMANCE_READ: "performance:read",
  PERFORMANCE_UPDATE: "performance:update",

  DOCUMENT_READ: "document:read",
  DOCUMENT_MANAGE: "document:manage",

  REPORT_READ: "report:read",

  SETTINGS_MANAGE: "settings:manage",
  USER_MANAGE: "user:manage",
  AUDIT_READ: "audit:read",
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ALL_PERMISSIONS: ReadonlyArray<{
  key: PermissionKey;
  module: string;
  description: string;
}> = [
  { key: PERMISSIONS.EMPLOYEE_CREATE, module: "employee", description: "Create employee records" },
  { key: PERMISSIONS.EMPLOYEE_READ, module: "employee", description: "View employee records" },
  { key: PERMISSIONS.EMPLOYEE_UPDATE, module: "employee", description: "Update employee records" },
  { key: PERMISSIONS.EMPLOYEE_DELETE, module: "employee", description: "Delete/deactivate employee records" },

  { key: PERMISSIONS.DEPARTMENT_CREATE, module: "department", description: "Create departments" },
  { key: PERMISSIONS.DEPARTMENT_READ, module: "department", description: "View departments" },
  { key: PERMISSIONS.DEPARTMENT_UPDATE, module: "department", description: "Update departments" },
  { key: PERMISSIONS.DEPARTMENT_DELETE, module: "department", description: "Delete departments" },

  { key: PERMISSIONS.ATTENDANCE_READ, module: "attendance", description: "View attendance records" },
  { key: PERMISSIONS.ATTENDANCE_MANAGE, module: "attendance", description: "Edit/correct attendance records" },

  { key: PERMISSIONS.LEAVE_CREATE, module: "leave", description: "Submit a leave request" },
  { key: PERMISSIONS.LEAVE_READ, module: "leave", description: "View leave requests" },
  { key: PERMISSIONS.LEAVE_APPROVE, module: "leave", description: "Approve a leave request" },
  { key: PERMISSIONS.LEAVE_REJECT, module: "leave", description: "Reject a leave request" },

  { key: PERMISSIONS.PAYROLL_CREATE, module: "payroll", description: "Create a payroll run" },
  { key: PERMISSIONS.PAYROLL_READ, module: "payroll", description: "View payroll data" },
  { key: PERMISSIONS.PAYROLL_UPDATE, module: "payroll", description: "Edit payroll data" },
  { key: PERMISSIONS.PAYROLL_APPROVE, module: "payroll", description: "Approve/finalize a payroll run" },

  { key: PERMISSIONS.RECRUITMENT_CREATE, module: "recruitment", description: "Create job requisitions" },
  { key: PERMISSIONS.RECRUITMENT_READ, module: "recruitment", description: "View requisitions and applicants" },
  { key: PERMISSIONS.RECRUITMENT_UPDATE, module: "recruitment", description: "Update requisitions/candidates" },
  { key: PERMISSIONS.RECRUITMENT_DELETE, module: "recruitment", description: "Close/delete requisitions" },

  { key: PERMISSIONS.PERFORMANCE_CREATE, module: "performance", description: "Create review cycles" },
  { key: PERMISSIONS.PERFORMANCE_READ, module: "performance", description: "View performance reviews" },
  { key: PERMISSIONS.PERFORMANCE_UPDATE, module: "performance", description: "Edit reviews/goals" },

  { key: PERMISSIONS.DOCUMENT_READ, module: "document", description: "View shared documents" },
  { key: PERMISSIONS.DOCUMENT_MANAGE, module: "document", description: "Upload/manage documents" },

  { key: PERMISSIONS.REPORT_READ, module: "report", description: "View reports and analytics" },

  { key: PERMISSIONS.SETTINGS_MANAGE, module: "settings", description: "Manage organization settings" },
  { key: PERMISSIONS.USER_MANAGE, module: "user", description: "Manage users, roles, and permissions" },
  { key: PERMISSIONS.AUDIT_READ, module: "audit", description: "View audit logs and security events" },
];

export const SYSTEM_ROLE_SLUGS = {
  SUPER_ADMIN: "SUPER_ADMIN",
  HR_ADMIN: "HR_ADMIN",
  HR_MANAGER: "HR_MANAGER",
  RECRUITER: "RECRUITER",
  PAYROLL_ADMIN: "PAYROLL_ADMIN",
  DEPARTMENT_MANAGER: "DEPARTMENT_MANAGER",
  EMPLOYEE: "EMPLOYEE",
} as const;

export type SystemRoleSlug = (typeof SYSTEM_ROLE_SLUGS)[keyof typeof SYSTEM_ROLE_SLUGS];

export const DEFAULT_ROLE_TEMPLATES: ReadonlyArray<{
  name: string;
  slug: SystemRoleSlug;
  description: string;
  permissionKeys: PermissionKey[];
}> = [
  {
    name: "Super Admin",
    slug: SYSTEM_ROLE_SLUGS.SUPER_ADMIN,
    description: "Full system access across every module",
    permissionKeys: ALL_PERMISSIONS.map((p) => p.key) as PermissionKey[],
  },
  {
    name: "HR Admin",
    slug: SYSTEM_ROLE_SLUGS.HR_ADMIN,
    description: "Full HR operations access, excluding organization-level settings",
    permissionKeys: [
      PERMISSIONS.EMPLOYEE_CREATE, PERMISSIONS.EMPLOYEE_READ, PERMISSIONS.EMPLOYEE_UPDATE, PERMISSIONS.EMPLOYEE_DELETE,
      PERMISSIONS.DEPARTMENT_CREATE, PERMISSIONS.DEPARTMENT_READ, PERMISSIONS.DEPARTMENT_UPDATE, PERMISSIONS.DEPARTMENT_DELETE,
      PERMISSIONS.ATTENDANCE_READ, PERMISSIONS.ATTENDANCE_MANAGE,
      PERMISSIONS.LEAVE_READ, PERMISSIONS.LEAVE_APPROVE, PERMISSIONS.LEAVE_REJECT,
      PERMISSIONS.DOCUMENT_READ, PERMISSIONS.DOCUMENT_MANAGE,
      PERMISSIONS.REPORT_READ,
      PERMISSIONS.USER_MANAGE,
    ],
  },
  {
    name: "HR Manager",
    slug: SYSTEM_ROLE_SLUGS.HR_MANAGER,
    description: "Day-to-day HR operations for assigned departments",
    permissionKeys: [
      PERMISSIONS.EMPLOYEE_READ, PERMISSIONS.EMPLOYEE_UPDATE,
      PERMISSIONS.DEPARTMENT_READ,
      PERMISSIONS.ATTENDANCE_READ, PERMISSIONS.ATTENDANCE_MANAGE,
      PERMISSIONS.LEAVE_READ, PERMISSIONS.LEAVE_APPROVE, PERMISSIONS.LEAVE_REJECT,
      PERMISSIONS.DOCUMENT_READ, PERMISSIONS.DOCUMENT_MANAGE,
      PERMISSIONS.REPORT_READ,
    ],
  },
  {
    name: "Recruiter",
    slug: SYSTEM_ROLE_SLUGS.RECRUITER,
    description: "Manages job requisitions and candidate pipelines",
    permissionKeys: [
      PERMISSIONS.RECRUITMENT_CREATE, PERMISSIONS.RECRUITMENT_READ, PERMISSIONS.RECRUITMENT_UPDATE, PERMISSIONS.RECRUITMENT_DELETE,
      PERMISSIONS.DEPARTMENT_READ,
      PERMISSIONS.EMPLOYEE_READ,
    ],
  },
  {
    name: "Payroll Admin",
    slug: SYSTEM_ROLE_SLUGS.PAYROLL_ADMIN,
    description: "Manages payroll processing exclusively",
    permissionKeys: [
      PERMISSIONS.PAYROLL_CREATE, PERMISSIONS.PAYROLL_READ, PERMISSIONS.PAYROLL_UPDATE, PERMISSIONS.PAYROLL_APPROVE,
      PERMISSIONS.EMPLOYEE_READ,
    ],
  },
  {
    name: "Department Manager",
    slug: SYSTEM_ROLE_SLUGS.DEPARTMENT_MANAGER,
    description: "Manages their own department's employees and approvals",
    permissionKeys: [
      PERMISSIONS.EMPLOYEE_READ,
      PERMISSIONS.ATTENDANCE_READ,
      PERMISSIONS.LEAVE_READ, PERMISSIONS.LEAVE_APPROVE, PERMISSIONS.LEAVE_REJECT,
      PERMISSIONS.PERFORMANCE_READ, PERMISSIONS.PERFORMANCE_UPDATE,
      PERMISSIONS.REPORT_READ,
    ],
  },
  {
    name: "Employee",
    slug: SYSTEM_ROLE_SLUGS.EMPLOYEE,
    description: "Standard employee self-service access",
    permissionKeys: [
      PERMISSIONS.LEAVE_CREATE, PERMISSIONS.LEAVE_READ,
      PERMISSIONS.DOCUMENT_READ,
      PERMISSIONS.PERFORMANCE_READ,
    ],
  },
];