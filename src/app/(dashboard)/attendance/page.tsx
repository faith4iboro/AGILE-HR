import { CalendarClock, CheckCircle2, Clock3, XCircle } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DashboardBreadcrumb } from "@/components/shared/dashboard-breadcrumb";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { StaggerGroup, StaggerItem, FadeIn } from "@/components/motion/fade-in";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AttendanceStatusBadge } from "@/features/attendance/attendance-status-badge";
import { DUMMY_ATTENDANCE } from "@/constants/dummy-data";

export const metadata = {
  title: "Attendance — AuraHR",
};

export default function AttendancePage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        breadcrumb={<DashboardBreadcrumb items={[{ label: "Attendance" }]} />}
        eyebrow="Operations"
        title="Attendance"
        description="Track daily clock-ins, lateness, and absences across your teams."
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StaggerItem>
          <StatCard
            label="Present Today"
            value="109"
            icon={CheckCircle2}
            tone="success"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Late Arrivals" value="6" icon={Clock3} tone="warning" />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Absent" value="2" icon={XCircle} tone="info" />
        </StaggerItem>
      </StaggerGroup>

      <FadeIn>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Clock In</TableHead>
              <TableHead>Clock Out</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DUMMY_ATTENDANCE.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.employeeName}</TableCell>
                <TableCell className="text-muted-foreground">{record.date}</TableCell>
                <TableCell className="text-muted-foreground">
                  {record.clockIn ?? "—"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {record.clockOut ?? "—"}
                </TableCell>
                <TableCell>
                  <AttendanceStatusBadge status={record.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </FadeIn>

      <div>
        <h2 className="text-foreground mb-3 text-sm font-semibold">
          Attendance anomalies
        </h2>
        <EmptyState
          icon={CalendarClock}
          title="No anomalies flagged"
          description="Unusual patterns like repeated lateness or missed clock-outs will surface here automatically."
        />
      </div>
    </div>
  );
}
