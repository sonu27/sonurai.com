export const intToDate = (int: string): string => {
  const datePattern = /^(\d{4})(\d{2})(\d{2})$/;
  const [, year, month, day] = datePattern.exec(int)!;
  return `${year}-${month}-${day}`;
};
