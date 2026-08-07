import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-input bg-card text-foreground flex h-10 w-full min-w-0 rounded-md border px-3.5 py-2 text-sm shadow-xs",
        "placeholder:text-muted-foreground transition-[color,box-shadow,border-color] outline-none",
        "selection:bg-primary selection:text-primary-foreground",
        "file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "focus-visible:border-primary focus-visible:ring-ring/50 focus-visible:ring-2",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        "disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
