import type { ID } from "./common";

export type PayrollRunStatus = "Draft" | "Processing" | "Completed" | "Failed";

export interface PayrollRun {
  id: ID;
  period: string;
  employeesPaid: number;
  totalAmount: number;
  status: PayrollRunStatus;
  runDate: string;
}
