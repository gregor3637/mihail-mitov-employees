export const multipleDateRegex =
  /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$|^((0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2})$|^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
// 'multipleDateRegex' should support the following formats:
// "12/31/2022",
// "31/12/2022",
// "2022-12-31",

export const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
export const numberRegex = /^[0-9]+$/;
