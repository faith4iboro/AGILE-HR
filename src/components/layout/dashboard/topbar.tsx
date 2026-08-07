"use client";

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  Menu,
  Search,
  Settings,
  LogOut,
  UserRound,
  ChevronDown,
} from "lucide-react";

import { useUIStore } from "@/store/ui-store";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";

export function DashboardTopbar() {
  const { setMobileNavOpen } = useUIStore();

  return (
    <header className="border-border bg-background/85 sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b px-4 backdrop-blur-md sm:px-6">
      <button
        onClick={() => setMobileNavOpen(true)}
        className="text-muted-foreground hover:bg-secondary hover:text-foreground flex size-9 items-center justify-center rounded-lg transition-colors lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" />
      </button>

      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          type="search"
          placeholder="Search employees, documents…"
          className="pl-9"
          aria-label="Search"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-[18px]" />
          <span className="bg-destructive ring-background absolute top-2 right-2 size-2 rounded-full ring-2" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hover:bg-secondary flex items-center gap-2.5 rounded-lg py-1 pr-2 pl-1 transition-colors">
              <Avatar className="size-8">
                <AvatarFallback>AO</AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start leading-tight sm:flex">
                <span className="text-foreground text-[13px] font-medium">
                  Amaka Obiora
                </span>
                <span className="text-muted-foreground text-[11px]">HR Admin</span>
              </div>
              <ChevronDown className="text-muted-foreground hidden size-3.5 sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={ROUTES.settings}>
                <UserRound />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={ROUTES.settings}>
                <Settings />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild variant="destructive">
              <Link href={ROUTES.home}>
                <LogOut />
                Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Badge variant="success" className="hidden lg:inline-flex">
          Demo workspace
        </Badge>
      </div>
    </header>
  );
}
