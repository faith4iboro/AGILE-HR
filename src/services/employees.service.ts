import type { Employee } from "@/types/employee";
import { DUMMY_EMPLOYEES } from "@/constants/dummy-data";
import { wait } from "@/lib/utils";

/**
 * Mock service layer. The function signatures here are what the real
 * Prisma/PostgreSQL-backed API will implement — swap the body for an
 * `apiClient.get(...)` call and every consumer (TanStack Query hooks,
 * components) keeps working unchanged.
 */
export const employeesService = {
  async list(): Promise<Employee[]> {
    await wait(400);
    return DUMMY_EMPLOYEES;
  },

  async getById(id: string): Promise<Employee | undefined> {
    await wait(300);
    return DUMMY_EMPLOYEES.find((employee) => employee.id === id);
  },
};
