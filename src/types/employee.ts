import type { ID } from "./common";

export type EmploymentStatus = "Active" | "On Leave" | "Suspended" | "Terminated";
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Intern";

export interface Employee {
  id: ID;
  employeeCode: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  employmentType: EmploymentType;
  status: EmploymentStatus;
  dateJoined: string;
  location: string;
}
