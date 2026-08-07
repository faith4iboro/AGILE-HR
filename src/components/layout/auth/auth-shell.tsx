import Link from "next/link";
import { Sparkles, ShieldCheck, Users2, Zap } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Users2, text: "Manage your entire workforce from one workspace." },
  { icon: Zap, text: "Automate payroll, attendance, and leave approvals." },
  { icon: ShieldCheck, text: "Enterprise-grade security and role-based access." },
];

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
      <div className="bg-sidebar text-sidebar-foreground relative hidden flex-col justify-between overflow-hidden p-10 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, color-mix(in oklch, var(--sidebar-primary), transparent 78%), transparent 45%), radial-gradient(circle at 85% 80%, color-mix(in oklch, var(--sidebar-primary), transparent 82%), transparent 50%)",
          }}
        />
        <Link href="/" className="relative z-10 flex items-center gap-2.5">
          <div className="bg-sidebar-primary flex size-9 items-center justify-center rounded-lg text-white">
            <Sparkles className="size-[18px]" strokeWidth={2.25} />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">
            AuraHR
          </span>
        </Link>

        <div className="relative z-10 flex flex-col gap-8">
          <p className="font-display max-w-md text-[26px] leading-snug font-medium text-balance">
            The operating system for how modern teams handle HR.
          </p>
          <ul className="flex flex-col gap-4">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item.text}
                className="text-sidebar-muted flex items-start gap-3 text-sm"
              >
                <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-white/5">
                  <item.icon className="text-sidebar-primary size-4" />
                </div>
                <span className="leading-relaxed">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sidebar-muted relative z-10 text-xs">
          © {new Date().getFullYear()} AuraHR. All rights reserved.
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
