export const intToDate = (int: number): string => {
  const datePattern = /^(\d{4})(\d{2})(\d{2})$/;
  const match = datePattern.exec(String(int));
  if (!match) {
    throw new Error(`Invalid date format: ${int}`);
  }
  const [, year, month, day] = match;
  return `${year}-${month}-${day}`;
};
