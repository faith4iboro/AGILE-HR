"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/shared/error-state";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background flex min-h-svh items-center justify-center px-6">
        <div className="w-full max-w-md">
          <ErrorState
            title="Something went wrong"
            description="An unexpected error occurred. Our team has been notified — please try again."
            onRetry={reset}
          />
        </div>
      </body>
    </html>
  );
}
