import { Building2, MapPin, Users } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Department } from "@/types/department";

export function DepartmentCard({ department }: { department: Department }) {
  return (
    <Card className="group gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex items-start justify-between">
          <div className="bg-primary-soft text-primary flex size-10 items-center justify-center rounded-xl">
            <Building2 className="size-5" strokeWidth={1.8} />
          </div>
          <span className="bg-secondary text-secondary-foreground rounded-full px-2.5 py-1 text-xs font-medium">
            <Users className="mr-1 inline size-3" /> {department.employeeCount}
          </span>
        </div>
        <div>
          <h3 className="text-foreground text-[15px] font-semibold">{department.name}</h3>
          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {department.description}
          </p>
        </div>
        <div className="border-border text-muted-foreground flex items-center justify-between border-t pt-3 text-xs">
          <span>Head: {department.headOfDepartment}</span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3" /> {department.location}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
