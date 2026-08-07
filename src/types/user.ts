import type { ID } from "./common";

export type UserRole = "Super Admin" | "HR Admin" | "Manager" | "Employee";

export interface AuthUser {
  id: ID;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  organization: string;
}
