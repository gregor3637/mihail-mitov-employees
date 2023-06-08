import { z } from "zod";
import {
  EmployeeCollectionSchema,
  EmployeeSchema,
} from "../zodSchemas/employeeSchema";

export type Employee = z.infer<typeof EmployeeSchema>;
export type EmployeeCollection = z.infer<typeof EmployeeCollectionSchema>;
