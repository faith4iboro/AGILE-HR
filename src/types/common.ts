export type ID = string;

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type AsyncStatus = "idle" | "loading" | "success" | "error";

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}
