import { Briefcase, FileUser, Plus, UserSearch } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { DashboardBreadcrumb } from "@/components/shared/dashboard-breadcrumb";
import { StatCard } from "@/components/shared/stat-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StaggerGroup, StaggerItem, FadeIn } from "@/components/motion/fade-in";
import { RequisitionStatusBadge } from "@/features/recruitment/requisition-status-badge";
import { DUMMY_JOB_REQUISITIONS } from "@/constants/dummy-data";
import { MapPin, Users } from "lucide-react";

export const metadata = {
  title: "Recruitment — AuraHR",
};

export default function RecruitmentPage() {
  return (
    <div className="flex flex-col gap-7">
      <PageHeader
        breadcrumb={<DashboardBreadcrumb items={[{ label: "Recruitment" }]} />}
        eyebrow="People"
        title="Recruitment"
        description="Manage open roles, track applicants, and move candidates through your pipeline."
        actions={
          <Button size="sm">
            <Plus />
            Post a job
          </Button>
        }
      />

      <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StaggerItem>
          <StatCard label="Open Positions" value="8" icon={Briefcase} tone="primary" />
        </StaggerItem>
        <StaggerItem>
          <StatCard label="Total Applicants" value="63" icon={FileUser} tone="success" />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label="Interviews This Week"
            value="11"
            icon={UserSearch}
            tone="info"
          />
        </StaggerItem>
      </StaggerGroup>

      <FadeIn>
        <div className="flex flex-col gap-3">
          {DUMMY_JOB_REQUISITIONS.map((job) => (
            <Card key={job.id} className="p-5">
              <CardContent className="flex flex-col gap-3 p-0 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-foreground text-[15px] font-semibold">
                    {job.title}
                  </h3>
                  <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                    <span>{job.department}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="size-3" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="size-3" /> {job.applicants} applicants
                    </span>
                  </div>
                </div>
                <RequisitionStatusBadge status={job.status} />
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeIn>

      <div>
        <h2 className="text-foreground mb-3 text-sm font-semibold">
          Interview scorecards
        </h2>
        <EmptyState
          icon={FileUser}
          title="No scorecards submitted yet"
          description="Structured interview feedback from your hiring panel will show up here."
        />
      </div>
    </div>
  );
}
