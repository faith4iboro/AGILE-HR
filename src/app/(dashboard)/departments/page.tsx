import { FolderKanban, Plus } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DashboardBreadcrumb } from "@/components/shared/dashboard-breadcrumb";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem } from "@/components/motion/fade-in";
import { DepartmentCard } from "@/features/departments/department-card";
import { DUMMY_DEPARTMENTS } from "@/constants/dummy-data";

export const metadata = {
  title: "Departments — AuraHR",
};

export default function DepartmentsPage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        breadcrumb={<DashboardBreadcrumb items={[{ label: "Departments" }]} />}
        eyebrow="People"
        title="Departments"
        description="A structural view of every team, its lead, and headcount."
        actions={
          <Button size="sm">
            <Plus />
            New department
          </Button>
        }
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {DUMMY_DEPARTMENTS.map((department) => (
          <StaggerItem key={department.id}>
            <DepartmentCard department={department} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <div>
        <h2 className="text-foreground mb-3 text-sm font-semibold">
          Pending restructure requests
        </h2>
        <EmptyState
          icon={FolderKanban}
          title="No pending requests"
          description="Department restructure or merge requests submitted by HR admins will appear here for review."
        />
      </div>
    </div>
  );
}
