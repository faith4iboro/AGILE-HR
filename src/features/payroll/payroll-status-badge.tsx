import { Badge } from "@/components/ui/badge";
import type { PayrollRunStatus } from "@/types/payroll";

const CONFIG: Record<
  PayrollRunStatus,
  "success" | "warning" | "destructive" | "secondary"
> = {
  Completed: "success",
  Processing: "warning",
  Draft: "secondary",
  Failed: "destructive",
};

export function PayrollStatusBadge({ status }: { status: PayrollRunStatus }) {
  return <Badge variant={CONFIG[status]}>{status}</Badge>;
}
