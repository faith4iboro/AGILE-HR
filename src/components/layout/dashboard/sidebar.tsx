"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronsLeft, Sparkles } from "lucide-react";

import { NAV_SECTIONS, SIDEBAR_NAV } from "@/constants/navigation";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();

  return (
    <motion.aside
      animate={{ width: isSidebarCollapsed ? 76 : 264 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="border-sidebar-border bg-sidebar text-sidebar-foreground sticky top-0 hidden h-svh shrink-0 flex-col border-r lg:flex"
    >
      <div
        className={cn(
          "border-sidebar-border flex h-16 items-center gap-2.5 border-b px-5",
          isSidebarCollapsed && "justify-center px-0"
        )}
      >
        <div className="bg-sidebar-primary flex size-8 shrink-0 items-center justify-center rounded-lg text-white">
          <Sparkles className="size-4" strokeWidth={2.25} />
        </div>
        {!isSidebarCollapsed && (
          <span className="font-display text-[17px] font-semibold tracking-tight text-white">
            AuraHR
          </span>
        )}
      </div>

      <nav className="flex-1 scrollbar-thin overflow-y-auto px-3 py-5">
        {NAV_SECTIONS.map((section) => {
          const items = SIDEBAR_NAV.filter((item) => item.section === section);
          return (
            <div key={section} className="mb-5 last:mb-0">
              {!isSidebarCollapsed && (
                <p className="text-sidebar-muted mb-2 px-3 text-[11px] font-semibold tracking-wider uppercase">
                  {section}
                </p>
              )}
              <ul className="flex flex-col gap-0.5">
                {items.map((item) => {
                  const isActive =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);
                  const Icon = item.icon;

                  const link = (
                    <Link
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-white"
                          : "text-sidebar-muted hover:bg-sidebar-accent/70 hover:text-white",
                        isSidebarCollapsed && "justify-center px-0"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="sidebar-active-indicator"
                          className="bg-sidebar-primary absolute top-1/2 left-0 h-4.5 w-[3px] -translate-y-1/2 rounded-r-full"
                          transition={{ duration: 0.2 }}
                        />
                      )}
                      <Icon className="size-[18px] shrink-0" strokeWidth={1.9} />
                      {!isSidebarCollapsed && (
                        <span className="flex-1 truncate">{item.label}</span>
                      )}
                      {!isSidebarCollapsed && item.badge && (
                        <span className="bg-sidebar-primary/20 text-sidebar-primary rounded-full px-2 py-0.5 text-[10px] font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );

                  return (
                    <li key={item.href}>
                      {isSidebarCollapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>{link}</TooltipTrigger>
                          <TooltipContent side="right">{item.label}</TooltipContent>
                        </Tooltip>
                      ) : (
                        link
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>

      <div className="border-sidebar-border border-t p-3">
        <button
          onClick={toggleSidebar}
          className={cn(
            "text-sidebar-muted hover:bg-sidebar-accent/70 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:text-white",
            isSidebarCollapsed && "justify-center px-0"
          )}
        >
          <ChevronsLeft
            className={cn(
              "size-[18px] transition-transform duration-300",
              isSidebarCollapsed && "rotate-180"
            )}
          />
          {!isSidebarCollapsed && "Collapse"}
        </button>
      </div>
    </motion.aside>
  );
}
