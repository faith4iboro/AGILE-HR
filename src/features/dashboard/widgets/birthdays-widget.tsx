import { Cake } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { UPCOMING_BIRTHDAYS } from "@/constants/dummy-data";

export function BirthdaysWidget() {
  return (
    <Card className="p-0">
      <CardHeader className="px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary-soft text-primary flex size-8 items-center justify-center rounded-lg">
            <Cake className="size-4" strokeWidth={1.9} />
          </div>
          <div>
            <CardTitle>Upcoming Birthdays</CardTitle>
            <CardDescription>Next 4 across the organization</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2.5 pb-2.5">
        <ul className="flex flex-col">
          {UPCOMING_BIRTHDAYS.map((person) => (
            <li
              key={person.id}
              className="hover:bg-secondary/50 flex items-center gap-3 rounded-lg px-2.5 py-2.5 transition-colors"
            >
              <Avatar className="size-9">
                <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-foreground truncate text-sm font-medium">
                  {person.name}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {person.department}
                </p>
              </div>
              <span className="text-primary shrink-0 text-xs font-medium">
                {person.date}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
