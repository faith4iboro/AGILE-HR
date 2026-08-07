import { Target, TrendingUp, Trophy } from "lucide-react";

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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem, FadeIn } from "@/components/motion/fade-in";
import { DUMMY_PERFORMANCE_CYCLES } from "@/constants/dummy-data";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Performance — AuraHR",
};

export default function PerformancePage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        breadcrumb={<DashboardBreadcrumb items={[{ label: "Performance" }]} />}
        eyebrow="Insights"
        title="Performance"
        description="Run review cycles, track goals, and recognize top contributors."
        actions={
          <Button size="sm">
            <Plus />
            New review cycle
          </Button>
        }
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StaggerItem>
          <StatCard
            label="Active Cycle Completion"
            value="34%"
            icon={Target}
            tone="primary"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Avg. Goal Progress"
            value="71%"
            icon={TrendingUp}
            tone="success"
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Top Performers" value="9" icon={Trophy} tone="warning" />
        </StaggerItem>
      </StaggerGroup>

      <FadeIn>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {DUMMY_PERFORMANCE_CYCLES.map((cycle) => (
            <Card key={cycle.id} className="p-5">
              <CardHeader className="p-0">
                <div className="flex items-center justify-between">
                  <CardTitle>{cycle.name}</CardTitle>
                  <Badge variant={cycle.status === "Completed" ? "success" : "info"}>
                    {cycle.status}
                  </Badge>
                </div>
                <CardDescription>{cycle.period}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 p-0 pt-4">
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <span>Completion</span>
                  <span className="text-foreground font-medium">
                    {cycle.completionRate}%
                  </span>
                </div>
                <Progress value={cycle.completionRate} />
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeIn>

      <div>
        <h2 className="text-foreground mb-3 text-sm font-semibold">360° feedback</h2>
        <EmptyState
          icon={Target}
          title="No peer feedback collected yet"
          description="Once reviewers submit 360° feedback, summarized themes will appear here."
        />
      </div>
    </div>
  );
}
