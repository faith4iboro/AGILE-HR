import { Badge } from "@/components/ui/badge";
import type { LeaveRequestStatus } from "@/types/leave";

const CONFIG: Record<LeaveRequestStatus, "success" | "warning" | "destructive"> = {
  Approved: "success",
  Pending: "warning",
  Rejected: "destructive",
};

export function LeaveStatusBadge({ status }: { status: LeaveRequestStatus }) {
  return <Badge variant={CONFIG[status]}>{status}</Badge>;
}
