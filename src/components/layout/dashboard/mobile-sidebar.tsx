"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

import { NAV_SECTIONS, SIDEBAR_NAV } from "@/constants/navigation";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

export function MobileSidebar() {
  const pathname = usePathname();
  const { isMobileNavOpen, setMobileNavOpen } = useUIStore();

  return (
    <Sheet open={isMobileNavOpen} onOpenChange={setMobileNavOpen}>
      <SheetContent side="left">
        <SheetTitle>Navigation</SheetTitle>
        <div className="border-sidebar-border flex h-16 items-center gap-2.5 border-b px-5">
          <div className="bg-sidebar-primary flex size-8 shrink-0 items-center justify-center rounded-lg text-white">
            <Sparkles className="size-4" strokeWidth={2.25} />
          </div>
          <span className="font-display text-[17px] font-semibold tracking-tight text-white">
            AuraHR
          </span>
        </div>
        <nav className="flex-1 scrollbar-thin overflow-y-auto px-3 pb-5">
          {NAV_SECTIONS.map((section) => {
            const items = SIDEBAR_NAV.filter((item) => item.section === section);
            return (
              <div key={section} className="mb-5 last:mb-0">
                <p className="text-sidebar-muted mb-2 px-3 text-[11px] font-semibold tracking-wider uppercase">
                  {section}
                </p>
                <ul className="flex flex-col gap-0.5">
                  {items.map((item) => {
                    const isActive =
                      pathname === item.href || pathname.startsWith(`${item.href}/`);
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileNavOpen(false)}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-sidebar-accent text-white"
                              : "text-sidebar-muted hover:bg-sidebar-accent/70 hover:text-white"
                          )}
                        >
                          <Icon className="size-[18px] shrink-0" strokeWidth={1.9} />
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="bg-sidebar-primary/20 text-sidebar-primary rounded-full px-2 py-0.5 text-[10px] font-semibold">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
