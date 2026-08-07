import { CalendarOff, CheckCircle2, Hourglass, Plus, XCircle } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DashboardBreadcrumb } from "@/components/shared/dashboard-breadcrumb";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem, FadeIn } from "@/components/motion/fade-in";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaveStatusBadge } from "@/features/leave/leave-status-badge";
import { DUMMY_LEAVE_REQUESTS } from "@/constants/dummy-data";

export const metadata = {
  title: "Leave Management — AuraHR",
};

export default function LeavePage() {
  const hasRequests = DUMMY_LEAVE_REQUESTS.length > 0;

  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        breadcrumb={<DashboardBreadcrumb items={[{ label: "Leave Management" }]} />}
        eyebrow="Operations"
        title="Leave Management"
        description="Review, approve, and track time-off requests across the organization."
        actions={
          <Button size="sm">
            <Plus />
            New request
          </Button>
        }
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StaggerItem>
          <StatCard label="Pending Requests" value="2" icon={Hourglass} tone="warning" />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Approved This Month"
            value="14"
            icon={CheckCircle2}
            tone="success"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Rejected This Month" value="1" icon={XCircle} tone="info" />
        </StaggerItem>
      </StaggerGroup>

      {hasRequests ? (
        <FadeIn>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Days</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_LEAVE_REQUESTS.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.employeeName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {request.leaveType}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {request.startDate} – {request.endDate}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{request.days}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {request.reason}
                  </TableCell>
                  <TableCell>
                    <LeaveStatusBadge status={request.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </FadeIn>
      ) : (
        <EmptyState
          icon={CalendarOff}
          title="No leave requests yet"
          description="Requests submitted by employees will appear here for your review and approval."
        />
      )}
    </div>
  );
}
