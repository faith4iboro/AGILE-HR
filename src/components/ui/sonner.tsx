"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

/**
 * Toast notification host. Mounted once in the root layout. Trigger toasts
 * anywhere in the app via `import { toast } from "sonner"`.
 */
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      theme="light"
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast rounded-lg border border-border bg-card text-foreground shadow-lg font-sans",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-secondary text-secondary-foreground",
          success: "!border-success/25 [&_svg]:!text-success",
          warning: "!border-warning/30 [&_svg]:!text-warning-foreground",
          error: "!border-destructive/25 [&_svg]:!text-destructive",
          info: "!border-info/25 [&_svg]:!text-info",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
