import { z } from "zod";
import {
  hasDateFormat,
  isDateToAValidEntry,
  isEmptyDateEntry,
  isNumber,
  parseNumber,
} from "../utils/zodValidations";
import {
  invalidDateToFormatMessage,
  invalidDateToMessage,
  invalidNumberMessage,
} from "../utils/zodMessages";

export const ProjectParticipantSchema = z.object({
  EmpID: z
    .string()
    .refine(isNumber, invalidNumberMessage("EmpID"))
    .transform(parseNumber),
  ProjectID: z
    .string()
    .refine(isNumber, invalidNumberMessage("ProjectID"))
    .transform(parseNumber),
  DateFrom: z
    .string()
    .refine(hasDateFormat, invalidDateToFormatMessage())
    .transform((val) => new Date(val)),
  DateTo: z
    .string()
    .nullable()
    .refine(isDateToAValidEntry, invalidDateToMessage("DateTo"))
    .transform((val) => (isEmptyDateEntry(val) ? new Date() : new Date(val!))),
});

export const ProjectParticipantCollectionSchema = z.array(ProjectParticipantSchema);
