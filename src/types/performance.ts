import type { ID } from "./common";

export type ReviewCycleStatus = "Not Started" | "In Progress" | "Completed";

export interface PerformanceCycle {
  id: ID;
  name: string;
  period: string;
  status: ReviewCycleStatus;
  completionRate: number;
}
