"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="border-border/70 bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href={ROUTES.home} className="flex items-center gap-2.5">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
            <Sparkles className="size-4" strokeWidth={2.25} />
          </div>
          <span className="font-display text-foreground text-lg font-semibold tracking-tight">
            AuraHR
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <Button asChild variant="ghost" size="sm">
            <Link href={ROUTES.login}>Sign in</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={ROUTES.register}>Start free trial</Link>
          </Button>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-foreground flex size-9 items-center justify-center rounded-lg md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-border/70 bg-background overflow-hidden border-t transition-all duration-300 md:hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-shell flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:bg-secondary hover:text-foreground rounded-lg px-3 py-2.5 text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex flex-col gap-2 px-3">
            <Button asChild variant="outline" size="sm">
              <Link href={ROUTES.login}>Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={ROUTES.register}>Start free trial</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
