import {
  LayoutGrid,
  Users,
  Building2,
  CalendarClock,
  CalendarOff,
  Banknote,
  UserSearch,
  Target,
  FolderClosed,
  BarChart3,
  Settings,
  type LucideIcon,
} from "lucide-react";

import { ROUTES } from "./routes";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  section: "Overview" | "People" | "Operations" | "Insights";
  badge?: string;
}

export const SIDEBAR_NAV: SidebarNavItem[] = [
  { label: "Dashboard", href: ROUTES.dashboard, icon: LayoutGrid, section: "Overview" },
  { label: "Employees", href: ROUTES.employees, icon: Users, section: "People" },
  { label: "Departments", href: ROUTES.departments, icon: Building2, section: "People" },
  {
    label: "Attendance",
    href: ROUTES.attendance,
    icon: CalendarClock,
    section: "Operations",
  },
  {
    label: "Leave Management",
    href: ROUTES.leave,
    icon: CalendarOff,
    section: "Operations",
  },
  { label: "Payroll", href: ROUTES.payroll, icon: Banknote, section: "Operations" },
  {
    label: "Recruitment",
    href: ROUTES.recruitment,
    icon: UserSearch,
    section: "People",
    badge: "New",
  },
  { label: "Performance", href: ROUTES.performance, icon: Target, section: "Insights" },
  {
    label: "Documents",
    href: ROUTES.documents,
    icon: FolderClosed,
    section: "Operations",
  },
  { label: "Reports", href: ROUTES.reports, icon: BarChart3, section: "Insights" },
  { label: "Settings", href: ROUTES.settings, icon: Settings, section: "Overview" },
];

export const NAV_SECTIONS: SidebarNavItem["section"][] = [
  "Overview",
  "People",
  "Operations",
  "Insights",
];
