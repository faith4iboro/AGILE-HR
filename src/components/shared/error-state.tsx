"use client";

import * as React from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

/**
 * Standard error state: shown when a request fails. States plainly what
 * happened and offers a direct way to recover.
 */
export function ErrorState({
  title = "Something went wrong",
  description = "This data couldn't be loaded. Check your connection and try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "border-destructive/20 bg-destructive-soft/60 flex flex-col items-center justify-center gap-4 rounded-xl border px-6 py-16 text-center",
        className
      )}
    >
      <div className="bg-card text-destructive flex size-14 items-center justify-center rounded-2xl shadow-sm">
        <AlertTriangle className="size-6" strokeWidth={1.75} />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-foreground text-base font-semibold">{title}</h3>
        <p className="text-muted-foreground mx-auto max-w-sm text-sm leading-relaxed">
          {description}
        </p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCcw />
          Try again
        </Button>
      )}
    </div>
  );
}
