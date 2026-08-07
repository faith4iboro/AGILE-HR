import {
  Users,
  UserCheck,
  UserMinus,
  Wallet,
  Clock3,
  Briefcase,
  UserPlus,
} from "lucide-react";

import { StatCard } from "@/components/shared/stat-card";
import { StaggerGroup, StaggerItem } from "@/components/motion/fade-in";
import { DASHBOARD_STATS } from "@/constants/dummy-data";
import { formatNumber } from "@/lib/utils";

export function StatWidgetsGrid() {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StaggerItem>
        <StatCard
          label="Total Employees"
          value={formatNumber(DASHBOARD_STATS.totalEmployees)}
          icon={Users}
          tone="primary"
          trend={{ value: "+3.2%", direction: "up", label: "vs last month" }}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          label="Active Employees"
          value={formatNumber(DASHBOARD_STATS.activeEmployees)}
          icon={UserCheck}
          tone="success"
          trend={{ value: "93.1%", direction: "up", label: "of total headcount" }}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          label="Employees on Leave"
          value={formatNumber(DASHBOARD_STATS.onLeave)}
          icon={UserMinus}
          tone="warning"
          trend={{ value: "2 pending", direction: "down", label: "requests to review" }}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          label="Payroll Status"
          value={DASHBOARD_STATS.payrollStatusLabel}
          icon={Wallet}
          tone="info"
          trend={{ value: "Jun 2026", direction: "up", label: "last run completed" }}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          label="Attendance Rate"
          value={`${DASHBOARD_STATS.attendanceRate}%`}
          icon={Clock3}
          tone="primary"
          trend={{ value: "+1.4%", direction: "up", label: "this week" }}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          label="Open Positions"
          value={formatNumber(DASHBOARD_STATS.openPositions)}
          icon={Briefcase}
          tone="secondary"
          trend={{ value: "3 depts", direction: "up", label: "actively hiring" }}
        />
      </StaggerItem>
      <StaggerItem>
        <StatCard
          label="New Applicants"
          value={formatNumber(DASHBOARD_STATS.newApplicants)}
          icon={UserPlus}
          tone="success"
          trend={{ value: "+18", direction: "up", label: "in the last 7 days" }}
        />
      </StaggerItem>
    </StaggerGroup>
  );
}
