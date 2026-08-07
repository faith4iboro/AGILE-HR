import { PageHeader } from "@/components/shared/page-header";
import { FadeIn } from "@/components/motion/fade-in";
import { StatWidgetsGrid } from "@/features/dashboard/widgets/stat-widgets-grid";
import { BirthdaysWidget } from "@/features/dashboard/widgets/birthdays-widget";
import { EmployeeGrowthChart } from "@/features/dashboard/charts/employee-growth-chart";
import { AttendanceTrendChart } from "@/features/dashboard/charts/attendance-trend-chart";
import { DepartmentDistributionChart } from "@/features/dashboard/charts/department-distribution-chart";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";

export const metadata = {
  title: "Dashboard — AuraHR",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        eyebrow="Overview"
        title="Good afternoon, Amaka"
        description="Here's what's happening across your organization today."
        actions={
          <>
            <Button variant="outline" size="sm">
              <Download />
              Export report
            </Button>
            <Button size="sm">
              <Plus />
              Add employee
            </Button>
          </>
        }
      />

      <StatWidgetsGrid />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <FadeIn className="xl:col-span-2" delay={0.05}>
          <EmployeeGrowthChart />
        </FadeIn>
        <FadeIn delay={0.1}>
          <BirthdaysWidget />
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <FadeIn delay={0.1}>
          <AttendanceTrendChart />
        </FadeIn>
        <FadeIn delay={0.15}>
          <DepartmentDistributionChart />
        </FadeIn>
      </div>
    </div>
  );
}
