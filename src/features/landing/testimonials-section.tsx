import { Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StaggerGroup, StaggerItem } from "@/components/motion/fade-in";

const TESTIMONIALS = [
  {
    quote:
      "We used to manage attendance and leave on three different spreadsheets. AuraHR gave our HR team one place to work from, and it shows in how much faster we approve requests now.",
    name: "Ngozi Adeleke",
    role: "Head of People, Faro Logistics",
  },
  {
    quote:
      "The payroll module alone paid for itself in the first quarter. What used to take our finance team two days now takes an afternoon.",
    name: "Kwame Asante",
    role: "Finance Director, Meridian Retail Group",
  },
  {
    quote:
      "Rolling out AuraHR across four subsidiaries was far smoother than we expected. Each entity has its own structure, but leadership finally sees one consolidated view.",
    name: "Fatima Bello",
    role: "Group HR Manager, Vantage Holdings",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-y border-border border-t">
      <div className="container-shell">
        <div className="max-w-2xl">
          <span className="text-primary text-xs font-semibold tracking-wider uppercase">
            Trusted by teams
          </span>
          <h2 className="font-display text-foreground mt-3 text-3xl font-medium tracking-tight text-balance sm:text-[34px]">
            HR teams run leaner with AuraHR.
          </h2>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <figure className="border-border bg-card flex h-full flex-col gap-5 rounded-xl border p-6">
                <div className="text-warning flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground flex-1 text-[15px] leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="border-border flex items-center gap-3 border-t pt-4">
                  <Avatar>
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
