import { Banknote, FileSpreadsheet, PlayCircle, Wallet } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DashboardBreadcrumb } from "@/components/shared/dashboard-breadcrumb";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StaggerGroup, StaggerItem, FadeIn } from "@/components/motion/fade-in";
import { PayrollStatusBadge } from "@/features/payroll/payroll-status-badge";
import { DUMMY_PAYROLL_RUNS } from "@/constants/dummy-data";
import { formatCurrency, formatNumber } from "@/lib/utils";

export const metadata = {
  title: "Payroll — AuraHR",
};

export default function PayrollPage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        breadcrumb={<DashboardBreadcrumb items={[{ label: "Payroll" }]} />}
        eyebrow="Operations"
        title="Payroll"
        description="Run payroll, review past cycles, and keep compensation records accurate."
        actions={
          <Button size="sm">
            <PlayCircle />
            Run July payroll
          </Button>
        }
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StaggerItem>
          <StatCard
            label="Last Payroll Cost"
            value={formatCurrency(84250000)}
            icon={Wallet}
            tone="primary"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Employees Paid"
            value={formatNumber(116)}
            icon={Banknote}
            tone="success"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Pending Payslips"
            value="0"
            icon={FileSpreadsheet}
            tone="secondary"
          />
        </StaggerItem>
      </StaggerGroup>

      <FadeIn>
        <Card className="p-0">
          <CardHeader className="px-5 pt-5">
            <CardTitle>Payroll runs</CardTitle>
            <CardDescription>Recent and upcoming payroll cycles</CardDescription>
          </CardHeader>
          <CardContent className="divide-border flex flex-col divide-y px-5 pb-5">
            {DUMMY_PAYROLL_RUNS.map((run) => (
              <div
                key={run.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-2"
              >
                <div>
                  <p className="text-foreground text-sm font-medium">{run.period}</p>
                  <p className="text-muted-foreground text-xs">
                    {run.employeesPaid > 0
                      ? `${formatNumber(run.employeesPaid)} employees · ${formatCurrency(run.totalAmount)}`
                      : "Not yet processed"}
                  </p>
                </div>
                <PayrollStatusBadge status={run.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </FadeIn>

      <div>
        <h2 className="text-foreground mb-3 text-sm font-semibold">
          Compliance & deductions
        </h2>
        <EmptyState
          icon={FileSpreadsheet}
          title="No deduction rules configured"
          description="Tax bands, pension contributions, and statutory deductions will be configured here."
        />
      </div>
    </div>
  );
}
