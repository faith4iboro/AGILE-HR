import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StaggerGroup, StaggerItem } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

const PLANS = [
  {
    name: "Starter",
    description: "For small teams getting their HR foundations in place.",
    price: "Contact us",
    featured: false,
    features: [
      "Up to 50 employees",
      "Employee records & documents",
      "Attendance & leave management",
      "Email support",
    ],
  },
  {
    name: "Growth",
    description: "For growing organizations that need payroll and recruitment.",
    price: "Contact us",
    featured: true,
    features: [
      "Up to 500 employees",
      "Everything in Starter",
      "Payroll & recruitment modules",
      "Performance reviews",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    description: "For multi-entity groups with custom compliance needs.",
    price: "Contact us",
    featured: false,
    features: [
      "Unlimited employees",
      "Everything in Growth",
      "Multi-entity structure",
      "Custom roles & permissions",
      "Dedicated success manager",
    ],
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="section-y border-border bg-secondary/30 border-t">
      <div className="container-shell">
        <div className="max-w-2xl">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">
            Pricing
          </span>
          <h2 className="font-display text-foreground mt-3 text-3xl font-medium tracking-tight text-balance sm:text-[34px]">
            Plans that grow with your organization.
          </h2>
          <p className="text-muted-foreground mt-4 text-[15px] leading-relaxed">
            Final pricing depends on headcount and modules enabled. Talk to us for a plan
            tailored to your organization — this is a placeholder while packaging is
            finalized.
          </p>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <StaggerItem key={plan.name}>
              <div
                className={cn(
                  "flex h-full flex-col gap-6 rounded-2xl border p-7",
                  plan.featured
                    ? "border-primary bg-card shadow-lg"
                    : "border-border bg-card"
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-foreground text-lg font-semibold">
                      {plan.name}
                    </h3>
                    {plan.featured && <Badge>Most popular</Badge>}
                  </div>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <div>
                  <span className="font-display text-foreground text-3xl font-semibold">
                    {plan.price}
                  </span>
                </div>

                <ul className="flex flex-1 flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-muted-foreground flex items-start gap-2 text-sm"
                    >
                      <Check className="text-primary mt-0.5 size-4 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={plan.featured ? "default" : "outline"}
                  className="w-full"
                >
                  <Link href={ROUTES.register}>Talk to sales</Link>
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
