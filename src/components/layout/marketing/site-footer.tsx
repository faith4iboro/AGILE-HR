import Link from "next/link";
import { Sparkles } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Modules", href: "#modules" },
      { label: "Pricing", href: "#pricing" },
      { label: "Security", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: "#" },
      { label: "API Docs", href: "#" },
      { label: "Status", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Data Processing", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-border bg-secondary/30 border-t">
      <div className="container-shell py-14">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg">
                <Sparkles className="size-4" strokeWidth={2.25} />
              </div>
              <span className="font-display text-foreground text-lg font-semibold tracking-tight">
                AuraHR
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              The connected workspace for people operations — built for teams in Africa
              and beyond.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="text-foreground text-sm font-semibold">{column.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-border mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} AuraHR. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built for modern people operations.
          </p>
        </div>
      </div>
    </footer>
  );
}
