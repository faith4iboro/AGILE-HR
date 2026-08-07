import {
  Banknote,
  Building2,
  CalendarClock,
  CalendarOff,
  FolderClosed,
  LayoutGrid,
  BarChart3,
  Target,
  UserSearch,
  Users,
} from "lucide-react";

import { StaggerGroup, StaggerItem } from "@/components/motion/fade-in";

const MODULES = [
  {
    icon: LayoutGrid,
    name: "Dashboard",
    description: "A live view of headcount, attendance, and payroll.",
  },
  {
    icon: Users,
    name: "Employees",
    description: "Centralized profiles, roles, and employment history.",
  },
  {
    icon: Building2,
    name: "Departments",
    description: "Org structure, leads, and headcount by team.",
  },
  {
    icon: CalendarClock,
    name: "Attendance",
    description: "Clock-ins, lateness, and daily presence tracking.",
  },
  {
    icon: CalendarOff,
    name: "Leave Management",
    description: "Requests, approvals, and balances in one flow.",
  },
  {
    icon: Banknote,
    name: "Payroll",
    description: "Run payroll cycles and keep compensation accurate.",
  },
  {
    icon: UserSearch,
    name: "Recruitment",
    description: "Job postings, applicant pipelines, and scorecards.",
  },
  {
    icon: Target,
    name: "Performance",
    description: "Review cycles, goals, and 360° feedback.",
  },
  {
    icon: FolderClosed,
    name: "Documents",
    description: "Policies, contracts, and forms, always accessible.",
  },
  {
    icon: BarChart3,
    name: "Reports",
    description: "Exportable insights across every module.",
  },
];

export function ModulesSection() {
  return (
    <section id="modules" className="section-y border-border bg-secondary/30 border-t">
      <div className="container-shell">
        <div className="max-w-2xl">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">
            Modules
          </span>
          <h2 className="font-display text-foreground mt-3 text-3xl font-medium tracking-tight text-balance sm:text-[34px]">
            A complete HR suite, modular by design.
          </h2>
          <p className="text-muted-foreground mt-4 text-[15px] leading-relaxed">
            Start with what you need today. Every module works on its own and gets sharper
            together as your organization grows.
          </p>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {MODULES.map((module) => (
            <StaggerItem key={module.name}>
              <div className="group border-border bg-card flex h-full flex-col gap-3 rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="bg-primary-soft text-primary flex size-10 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105">
                  <module.icon className="size-[18px]" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-foreground text-sm font-semibold">{module.name}</h3>
                  <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
