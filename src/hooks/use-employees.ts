import { useQuery } from "@tanstack/react-query";

import { employeesService } from "@/services/employees.service";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: employeesService.list,
  });
}
