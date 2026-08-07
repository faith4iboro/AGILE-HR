import type { ID } from "./common";

export type JobRequisitionStatus = "Open" | "Interviewing" | "Closed" | "On Hold";

export interface JobRequisition {
  id: ID;
  title: string;
  department: string;
  status: JobRequisitionStatus;
  applicants: number;
  location: string;
  postedDate: string;
}
