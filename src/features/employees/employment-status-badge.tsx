import { Badge } from "@/components/ui/badge";
import { StatusDot } from "@/components/ui/badge";
import type { EmploymentStatus } from "@/types/employee";

const STATUS_CONFIG: Record<
  EmploymentStatus,
  {
    variant: "success" | "warning" | "destructive" | "secondary";
    tone: "success" | "warning" | "destructive" | "default";
  }
> = {
  Active: { variant: "success", tone: "success" },
  "On Leave": { variant: "warning", tone: "warning" },
  Suspended: { variant: "destructive", tone: "destructive" },
  Terminated: { variant: "secondary", tone: "default" },
};

export function EmploymentStatusBadge({ status }: { status: EmploymentStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <Badge variant={config.variant} className="gap-1.5">
      <StatusDot tone={config.tone} />
      {status}
    </Badge>
  );
}
