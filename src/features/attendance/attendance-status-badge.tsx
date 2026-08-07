import { Badge } from "@/components/ui/badge";
import { StatusDot } from "@/components/ui/badge";
import type { AttendanceStatus } from "@/types/attendance";

const CONFIG: Record<
  AttendanceStatus,
  {
    variant: "success" | "warning" | "destructive" | "secondary";
    tone: "success" | "warning" | "destructive" | "default";
  }
> = {
  Present: { variant: "success", tone: "success" },
  Late: { variant: "warning", tone: "warning" },
  Absent: { variant: "destructive", tone: "destructive" },
  "On Leave": { variant: "secondary", tone: "default" },
};

export function AttendanceStatusBadge({ status }: { status: AttendanceStatus }) {
  const config = CONFIG[status];
  return (
    <Badge variant={config.variant} className="gap-1.5">
      <StatusDot tone={config.tone} />
      {status}
    </Badge>
  );
}
