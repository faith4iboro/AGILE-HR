"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EMPLOYEE_GROWTH_DATA } from "@/constants/dummy-data";

export function EmployeeGrowthChart() {
  return (
    <Card className="p-0">
      <CardHeader className="px-5 pt-5">
        <CardTitle>Employee Growth</CardTitle>
        <CardDescription>Total headcount over the last 8 months</CardDescription>
      </CardHeader>
      <CardContent className="h-[280px] px-2 pt-2 pb-4 sm:px-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={EMPLOYEE_GROWTH_DATA}
            margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
          >
            <defs>
              <linearGradient id="employeeGrowthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 5"
              vertical={false}
              stroke="var(--color-border)"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
                fontSize: 13,
              }}
            />
            <Area
              type="monotone"
              dataKey="employees"
              stroke="var(--color-primary)"
              strokeWidth={2.5}
              fill="url(#employeeGrowthFill)"
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
