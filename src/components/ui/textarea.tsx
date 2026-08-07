import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input bg-card text-foreground flex min-h-20 w-full rounded-md border px-3.5 py-2.5 text-sm shadow-xs",
        "placeholder:text-muted-foreground transition-[color,box-shadow,border-color] outline-none",
        "focus-visible:border-primary focus-visible:ring-ring/50 focus-visible:ring-2",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
