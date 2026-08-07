import {
  BarChart3,
  FileBarChart2,
  PieChart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DashboardBreadcrumb } from "@/components/shared/dashboard-breadcrumb";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent } from "@/components/ui/card";
import { StaggerGroup, StaggerItem } from "@/components/motion/fade-in";

export const metadata = {
  title: "Reports — AuraHR",
};

const REPORT_TYPES = [
  {
    title: "Headcount Report",
    description: "Track hiring, attrition, and org growth over time.",
    icon: Users,
  },
  {
    title: "Payroll Summary",
    description: "Total compensation cost broken down by department.",
    icon: Wallet,
  },
  {
    title: "Attendance Report",
    description: "Punctuality and absenteeism trends by team.",
    icon: BarChart3,
  },
  {
    title: "Diversity & Inclusion",
    description: "Composition of your workforce across dimensions.",
    icon: PieChart,
  },
  {
    title: "Turnover Analysis",
    description: "Voluntary vs. involuntary exits and root causes.",
    icon: TrendingUp,
  },
  {
    title: "Custom Report",
    description: "Build a report from any combination of HR data.",
    icon: FileBarChart2,
  },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        breadcrumb={<DashboardBreadcrumb items={[{ label: "Reports" }]} />}
        eyebrow="Insights"
        title="Reports"
        description="Generate and export insights across every module in AuraHR."
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {REPORT_TYPES.map((report) => (
          <StaggerItem key={report.title}>
            <Card className="group cursor-pointer gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <CardContent className="flex flex-col gap-3 p-0">
                <div className="bg-primary-soft text-primary flex size-10 items-center justify-center rounded-xl transition-transform group-hover:scale-105">
                  <report.icon className="size-5" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-foreground text-[15px] font-semibold">
                    {report.title}
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {report.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div>
        <h2 className="text-foreground mb-3 text-sm font-semibold">Scheduled reports</h2>
        <EmptyState
          icon={FileBarChart2}
          title="No scheduled reports yet"
          description="Set up recurring exports and they'll be delivered to your inbox automatically."
        />
      </div>
    </div>
  );
}
