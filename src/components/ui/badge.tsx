import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 " +
    "text-xs font-medium transition-colors [&_svg]:size-3 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary-soft text-primary",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        outline: "border-border bg-transparent text-foreground",
        success: "border-transparent bg-success-soft text-success",
        warning: "border-transparent bg-warning-soft text-warning-foreground",
        destructive: "border-transparent bg-destructive-soft text-destructive",
        info: "border-transparent bg-info-soft text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

/** A small filled status dot, paired with text, for compact table cells. */
function StatusDot({
  className,
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "success" | "warning" | "destructive" | "info";
}) {
  const toneMap: Record<string, string> = {
    default: "bg-muted-foreground",
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
    info: "bg-info",
  };
  return (
    <span aria-hidden className={cn("size-1.5 rounded-full", toneMap[tone], className)} />
  );
}

export { Badge, badgeVariants, StatusDot };
