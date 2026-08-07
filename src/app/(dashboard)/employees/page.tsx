import { PageHeader } from "@/components/shared/page-header";
import { DashboardBreadcrumb } from "@/components/shared/dashboard-breadcrumb";
import { EmployeesView } from "@/features/employees/employees-view";

export const metadata = {
  title: "Employees — AuraHR",
};

export default function EmployeesPage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        breadcrumb={<DashboardBreadcrumb items={[{ label: "Employees" }]} />}
        eyebrow="People"
        title="Employees"
        description="Manage your organization's workforce, roles, and employment details."
      />
      <EmployeesView />
    </div>
  );
}
