import type { ID } from "./common";

export interface Department {
  id: ID;
  name: string;
  headOfDepartment: string;
  employeeCount: number;
  location: string;
  description: string;
}
