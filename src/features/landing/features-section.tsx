import {
  Fingerprint,
  Gauge,
  GitBranch,
  Layers,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { StaggerGroup, StaggerItem } from "@/components/motion/fade-in";

const FEATURES = [
  {
    icon: Layers,
    title: "One source of truth",
    description:
      "Every employee record, document, and change history lives in one place — no more chasing spreadsheets across departments.",
  },
  {
    icon: Workflow,
    title: "Automated workflows",
    description:
      "Leave approvals, onboarding checklists, and payroll runs move through configurable workflows built for how your teams actually work.",
  },
  {
    icon: Fingerprint,
    title: "Role-based access",
    description:
      "Give managers, HR admins, and employees exactly the visibility they need — nothing more, nothing less.",
  },
  {
    icon: Gauge,
    title: "Real-time insights",
    description:
      "Headcount, attendance, and payroll trends update live, so decisions are based on where things stand today.",
  },
  {
    icon: GitBranch,
    title: "Built for multi-entity groups",
    description:
      "Manage several subsidiaries or business units under one workspace, with reporting rolled up or split by entity.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade security",
    description:
      "Encrypted at rest and in transit, with detailed audit logs for every sensitive action taken in the system.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="section-y border-border border-t">
      <div className="container-shell">
        <div className="max-w-2xl">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">
            Why AuraHR
          </span>
          <h2 className="font-display text-foreground mt-3 text-3xl font-medium tracking-tight text-balance sm:text-[34px]">
            Everything people operations needs, nothing it doesn&apos;t.
          </h2>
          <p className="text-muted-foreground mt-4 text-[15px] leading-relaxed">
            AuraHR replaces the patchwork of spreadsheets, chat threads, and disconnected
            tools most HR teams rely on with a single, coherent system.
          </p>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="group border-border bg-card flex h-full flex-col gap-4 rounded-xl border p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                <div className="bg-primary-soft text-primary flex size-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105">
                  <feature.icon className="size-5" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-foreground text-[15px] font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                    {feature.description}
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
