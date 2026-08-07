import { Badge } from "@/components/ui/badge";
import type { JobRequisitionStatus } from "@/types/recruitment";

const CONFIG: Record<JobRequisitionStatus, "success" | "info" | "secondary" | "warning"> =
  {
    Open: "success",
    Interviewing: "info",
    "On Hold": "warning",
    Closed: "secondary",
  };

export function RequisitionStatusBadge({ status }: { status: JobRequisitionStatus }) {
  return <Badge variant={CONFIG[status]}>{status}</Badge>;
}
