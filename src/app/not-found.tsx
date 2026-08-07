import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="bg-primary-soft text-primary flex size-16 items-center justify-center rounded-2xl">
        <Compass className="size-7" strokeWidth={1.6} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-foreground text-3xl font-semibold">
          Page not found
        </h1>
        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
      </div>
      <Button asChild>
        <Link href={ROUTES.home}>Back to home</Link>
      </Button>
    </div>
  );
}
