import * as React from "react";
import { type LucideIcon, ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: "up" | "down";
    label?: string;
  };
  tone?: "primary" | "success" | "warning" | "info" | "secondary";
  className?: string;
}

const toneStyles: Record<NonNullable<StatCardProps["tone"]>, string> = {
  primary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning-foreground",
  info: "bg-info-soft text-info",
  secondary: "bg-secondary text-secondary-foreground",
};

/** A single KPI tile: icon, label, big number, and an optional trend delta. */
export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  tone = "primary",
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "group relative gap-4 overflow-hidden p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-muted-foreground text-[13px] font-medium">{label}</span>
        <div
          className={cn(
            "flex size-9 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105",
            toneStyles[tone]
          )}
        >
          <Icon className="size-4.5" strokeWidth={1.9} />
        </div>
      </div>
      <div className="flex items-end justify-between gap-3">
        <span className="font-display text-foreground text-[28px] leading-none font-semibold">
          {value}
        </span>
        {trend && (
          <span
            className={cn(
              "mb-0.5 flex items-center gap-0.5 text-xs font-medium",
              trend.direction === "up" ? "text-success" : "text-destructive"
            )}
          >
            {trend.direction === "up" ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {trend.value}
          </span>
        )}
      </div>
      {trend?.label && (
        <span className="text-muted-foreground text-xs">{trend.label}</span>
      )}
    </Card>
  );
}

export function StatCardSkeleton() {
  return (
    <Card className="gap-4 p-5">
      <div className="flex items-start justify-between">
        <div className="skeleton-shimmer h-3.5 w-24 rounded" />
        <div className="skeleton-shimmer size-9 rounded-lg" />
      </div>
      <div className="skeleton-shimmer h-7 w-20 rounded" />
      <div className="skeleton-shimmer h-3 w-28 rounded" />
    </Card>
  );
}
