import { z } from "zod";
import { EmployeeCollection } from "../types/EmployeeType";
import { EmployeeCollectionSchema } from "../zodSchemas/employeeSchema";

export const validateEmployeeCollection = (
  data: unknown
): EmployeeCollection | null => {
  const parsedResult = EmployeeCollectionSchema.safeParse(data);

  if (parsedResult.success) {
    return parsedResult.data;
  } else {
    return null;
  }
};
