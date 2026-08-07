import * as React from "react";
import { type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Standard empty state: used whenever a module has no records yet. Frames
 * emptiness as an invitation to act, not a dead end.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-border bg-secondary/30 flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed px-6 py-16 text-center",
        className
      )}
    >
      <div className="bg-primary-soft text-primary flex size-14 items-center justify-center rounded-2xl">
        <Icon className="size-6" strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-foreground text-base font-semibold">{title}</h3>
        <p className="text-muted-foreground mx-auto max-w-sm text-sm leading-relaxed">
          {description}
        </p>
      </div>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
