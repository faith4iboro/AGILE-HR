import type { ID } from "./common";

export type AttendanceStatus = "Present" | "Late" | "Absent" | "On Leave";

export interface AttendanceRecord {
  id: ID;
  employeeId: ID;
  employeeName: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: AttendanceStatus;
}
