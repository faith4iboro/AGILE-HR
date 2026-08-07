"use client";

import * as React from "react";
import { Mail, MoreHorizontal, Pencil, Phone, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EmploymentStatusBadge } from "@/features/employees/employment-status-badge";
import { getInitials } from "@/lib/utils";
import type { Employee } from "@/types/employee";

export function EmployeesTable({ employees }: { employees: Employee[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[240px]">Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead className="w-12 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(`${employee.firstName} ${employee.lastName}`)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-foreground truncate font-medium">
                    {employee.firstName} {employee.lastName}
                  </p>
                  <p className="text-muted-foreground truncate text-xs">
                    {employee.employeeCode}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">{employee.department}</TableCell>
            <TableCell className="text-muted-foreground">{employee.position}</TableCell>
            <TableCell>
              <EmploymentStatusBadge status={employee.status} />
            </TableCell>
            <TableCell>
              <div className="text-muted-foreground flex flex-col gap-0.5 text-xs">
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5" /> {employee.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5" /> {employee.phone}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`Actions for ${employee.firstName}`}
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Pencil /> Edit profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <Trash2 /> Deactivate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function EmployeesTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[240px]">Name</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead className="w-12 text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Skeleton className="h-3.5 w-24" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-3.5 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-5 w-20 rounded-full" />
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-36" />
                <Skeleton className="h-3 w-28" />
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="ml-auto size-7 rounded-md" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
