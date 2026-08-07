import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { ROUTES } from "@/constants/routes";

export function CTASection() {
  return (
    <section className="section-y border-border border-t">
      <div className="container-shell">
        <FadeIn>
          <div className="bg-sidebar relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, color-mix(in oklch, var(--sidebar-primary), transparent 75%), transparent 50%), radial-gradient(circle at 80% 80%, color-mix(in oklch, var(--sidebar-primary), transparent 80%), transparent 50%)",
              }}
            />
            <div className="relative z-10 mx-auto max-w-xl">
              <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-white sm:text-[34px]">
                Ready to bring your HR operations into one place?
              </h2>
              <p className="text-sidebar-muted mt-4 text-[15px] leading-relaxed">
                Start a free trial today, or talk to our team about migrating your
                existing HR data into AuraHR.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={ROUTES.register}>
                    Start free trial
                    <ArrowRight />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  <Link href={ROUTES.login}>Sign in</Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
