export function getYMDFromDateString(date: string) {
  const [y, m, d] = date.split('/');
  return {
    year: parseInt(y),
    month: parseInt(m),
    day: parseInt(d),
  };
}
