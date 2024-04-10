export function getYMDFromDateString(date: string) {
  return {
    year: parseInt(date.substring(0, 4)),
    month: parseInt(date.substring(4, 6)),
    day: parseInt(date.substring(6, 8)),
  };
}
