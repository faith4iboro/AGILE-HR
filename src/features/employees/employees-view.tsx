"use client";

import * as React from "react";
import { UsersRound } from "lucide-react";

import { useEmployees } from "@/hooks/use-employees";
import { EmployeesToolbar } from "@/features/employees/employees-toolbar";
import {
  EmployeesTable,
  EmployeesTableSkeleton,
} from "@/features/employees/employees-table";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DUMMY_DEPARTMENTS } from "@/constants/dummy-data";

export function EmployeesView() {
  const [search, setSearch] = React.useState("");
  const [department, setDepartment] = React.useState("all");
  const { data: employees, isLoading, isError, refetch } = useEmployees();

  const filtered = React.useMemo(() => {
    if (!employees) return [];
    return employees.filter((employee) => {
      const matchesDepartment =
        department === "all" || employee.department === department;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.employeeCode.toLowerCase().includes(query);
      return matchesDepartment && matchesSearch;
    });
  }, [employees, search, department]);

  return (
    <div className="flex flex-col gap-5">
      <EmployeesToolbar
        search={search}
        onSearchChange={setSearch}
        department={department}
        onDepartmentChange={setDepartment}
        departments={DUMMY_DEPARTMENTS.map((d) => d.name)}
      />

      {isLoading ? (
        <EmployeesTableSkeleton />
      ) : isError ? (
        <ErrorState
          title="Couldn't load employees"
          description="We ran into a problem fetching the employee directory."
          onRetry={() => refetch()}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={UsersRound}
          title="No employees found"
          description="Try a different search term or filter, or add your first employee to get started."
          action={
            <Button size="sm">
              <Plus />
              Add employee
            </Button>
          }
        />
      ) : (
        <FadeIn>
          <EmployeesTable employees={filtered} />
        </FadeIn>
      )}
    </div>
  );
}
