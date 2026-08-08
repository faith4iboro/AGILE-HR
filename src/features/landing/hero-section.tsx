import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { HeroNetworkGraphic } from "@/features/landing/hero-network-graphic";
import { ROUTES } from "@/constants/routes";

const PROOF_POINTS = [
  "No credit card required",
  "Setup in under a day",
  "Cancel anytime",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% -10%, color-mix(in oklch, var(--primary), transparent 88%), transparent 55%)",
        }}
      />
      <div className="container-shell relative grid grid-cols-1 items-center gap-14 pt-16 pb-16 sm:pt-24 lg:grid-cols-2 lg:gap-10 lg:pt-28 lg:pb-24">
        <FadeIn>
          <span className="border-border bg-card text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium shadow-xs">
            <span className="bg-success size-1.5 rounded-full" />
            Now supporting multi-entity organizations
          </span>
          <h1 className="font-display text-foreground mt-5 max-w-xl text-4xl leading-[1.1] font-medium tracking-tight text-balance sm:text-5xl lg:text-[52px]">
            Faith HR is the powerful workspace to run your entire workforce.
          </h1>
          <p className="text-muted-foreground mt-5 max-w-lg text-[17px] leading-relaxed text-balance">
            AuraHR brings employee records, attendance, leave, payroll, and recruitment
            into a single, connected system — so your people team spends less time on
            spreadsheets and more time on people.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <Link href={ROUTES.register}>
                Start free trial
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#modules">Explore modules</a>
            </Button>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {PROOF_POINTS.map((point) => (
              <li
                key={point}
                className="text-muted-foreground flex items-center gap-1.5 text-sm"
              >
                <CheckCircle2 className="text-success size-4" />
                {point}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="border-border bg-card relative rounded-3xl border p-6 shadow-lg sm:p-10">
            <HeroNetworkGraphic />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
