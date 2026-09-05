// src/types/auth.ts

export interface AuthenticatedUser {
  id: string;
  organizationId: string;
  organizationSlug: string;
  fullName: string;
  email: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  emailVerified: boolean;
  roles: string[];
  permissions: string[];
}

export interface RequestMeta {
  ipAddress: string | null;
  userAgent: string | null;
}

export interface IssuedTokens {
  accessToken: string;
  refreshToken: string;
  csrfToken: string;
}

export interface SessionSummary {
  id: string;
  userAgent: string | null;
  ipAddress: string | null;
  lastActiveAt: string;
  createdAt: string;
  isCurrent: boolean;
}