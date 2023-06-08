export const invalidDateMessage = (id: string) =>
  `Invalid date format. ${id} must be in YYYY-MM-DD format`;

export const invalidDateToMessage = (id: string) => ({
  message: invalidDateMessage(id) + ` or empty`,
});

export const invalidDateToFormatMessage = () => ({
  message: invalidDateMessage("DateFrom"),
});

export const invalidNumberMessage = (id: string) => ({
  message: `${id} must only contain numeric characters`,
});
