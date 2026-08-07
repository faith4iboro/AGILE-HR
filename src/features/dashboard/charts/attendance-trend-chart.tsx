"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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
import { ATTENDANCE_TREND_DATA } from "@/constants/dummy-data";

export function AttendanceTrendChart() {
  return (
    <Card className="p-0">
      <CardHeader className="px-5 pt-5">
        <CardTitle>Attendance Trend</CardTitle>
        <CardDescription>This week, by clock-in status</CardDescription>
      </CardHeader>
      <CardContent className="h-[280px] px-2 pt-2 pb-4 sm:px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ATTENDANCE_TREND_DATA}
            margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid
              strokeDasharray="3 5"
              vertical={false}
              stroke="var(--color-border)"
            />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={32}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "var(--color-secondary)" }}
              contentStyle={{
                borderRadius: 10,
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-md)",
                fontSize: 13,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12.5, paddingTop: 12 }} />
            <Bar
              dataKey="present"
              name="Present"
              fill="var(--color-chart-1)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="late"
              name="Late"
              fill="var(--color-chart-3)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="absent"
              name="Absent"
              fill="var(--color-chart-5)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
