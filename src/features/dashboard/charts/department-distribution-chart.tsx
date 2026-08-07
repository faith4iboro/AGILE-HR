"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DEPARTMENT_DISTRIBUTION_DATA } from "@/constants/dummy-data";

const COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-primary-hover)",
  "var(--color-secondary-foreground)",
];

export function DepartmentDistributionChart() {
  return (
    <Card className="p-0">
      <CardHeader className="px-5 pt-5">
        <CardTitle>Department Distribution</CardTitle>
        <CardDescription>Headcount share by department</CardDescription>
      </CardHeader>
      <CardContent className="flex h-[280px] flex-col gap-3 px-4 pt-2 pb-4 sm:flex-row sm:items-center">
        <div className="h-[180px] w-full shrink-0 sm:h-full sm:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DEPARTMENT_DISTRIBUTION_DATA}
                dataKey="value"
                nameKey="name"
                innerRadius="60%"
                outerRadius="90%"
                paddingAngle={3}
                strokeWidth={0}
              >
                {DEPARTMENT_DISTRIBUTION_DATA.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-md)",
                  fontSize: 13,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex w-full flex-1 scrollbar-thin flex-col gap-1.5 overflow-y-auto text-sm">
          {DEPARTMENT_DISTRIBUTION_DATA.map((entry, index) => (
            <li key={entry.name} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span className="text-muted-foreground flex-1 truncate">{entry.name}</span>
              <span className="text-foreground font-medium">{entry.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
