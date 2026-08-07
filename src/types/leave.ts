import type { ID } from "./common";

export type LeaveRequestStatus = "Pending" | "Approved" | "Rejected";

export interface LeaveRequest {
  id: ID;
  employeeId: ID;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveRequestStatus;
  reason: string;
}
