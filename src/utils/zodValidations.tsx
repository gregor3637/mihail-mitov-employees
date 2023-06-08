import { dateRegex, numberRegex } from "./regExPatterns";

export const isNumber = (value: string) =>
  numberRegex.test(value) && parseInt(value, 10) > 0;

export const parseNumber = (value: string) => parseInt(value, 10);

export const hasDateFormat = (value: string) => dateRegex.test(value);

export const isDateToAValidEntry = (value: string | null) => {
  return isEmptyDateEntry(value) || isValidDate(value!);
};

export const isEmptyDateEntry = (value: string | null) =>
  value === "" || value === null;

export const isValidDate = (date: string) => {
  const timestamp = Date.parse(date);
  return !isNaN(timestamp);
};
