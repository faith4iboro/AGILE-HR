import * as React from "react";

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumb?: React.ReactNode;
  className?: string;
}

/**
 * Standard header used at the top of every dashboard page: breadcrumb trail,
 * title + description, and a right-aligned action slot (buttons, filters).
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  breadcrumb,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {breadcrumb}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1.5">
          {eyebrow && (
            <span className="text-primary text-xs font-semibold tracking-wider uppercase">
              {eyebrow}
            </span>
          )}
          <h1 className="text-foreground text-2xl font-semibold sm:text-[28px]">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex shrink-0 flex-wrap items-center gap-2.5">{actions}</div>
        )}
      </div>
    </div>
  );
}
