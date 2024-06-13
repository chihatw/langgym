import { MirrorWorkoutResult } from '../schema';

export function buildMin(digits: number) {
  if (digits < 1) throw new Error();
  if (digits === 1) return 0;
  return 10 ** (digits - 1);
}

export function buildMax(digits: number) {
  if (digits < 1) throw new Error();
  return 10 ** digits - 1;
}

export function randomNumber(digits: number) {
  const min = buildMin(digits);
  const max = buildMax(digits);
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

export function buildRandomNumberSet(digits: number): number[] {
  const item_1 = randomNumber(digits);
  let item_2 = randomNumber(digits);
  while (item_1 === item_2) {
    item_2 = randomNumber(digits);
  }
  return [item_1, item_2];
}

export function buildMirrorWorkoutItems(digits: number, length: number) {
  const items: number[][] = [];
  for (let i = 0; i < length; i++) {
    const numberSet = buildRandomNumberSet(digits);
    items.push(numberSet);
  }
  return items;
}

export function getCorrectRatio(selectedNumbers: number[], items: number[][]) {
  if (!items.length) throw new Error();
  if (selectedNumbers.length !== items.length) throw new Error();
  let correctCount = 0;
  for (let i = 0; i < items.length; i++) {
    const rowItems = items[i];
    const selectedNumber = selectedNumbers[i];
    if (selectedNumber === Math.max(...rowItems)) correctCount++;
  }

  return Math.round((correctCount / items.length) * 100);
}

export function getUniqYYYYMMDDs(results: MirrorWorkoutResult[]) {
  const yyyymmdds = results.map((r) =>
    getYYYYMMDD(convertTimezone_TW(r.created_at))
  );
  const uniqYYYYMMDDs = Array.from(new Set(yyyymmdds));
  return uniqYYYYMMDDs.sort((a, b) => a - b);
}

export function convertTimezone_TW(date: Date) {
  return new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
}

export function getThursday(date: Date): Date {
  const day = date.getDay();
  const diff = (day > 3 ? 4 : -3) - day; // 日曜日から [-3, -4, -5 ,-6 ,0, -1, -2] と修正を入れる
  const cloned = convertTimezone_TW(new Date(date.toISOString()));
  const thursday = convertTimezone_TW(
    new Date(cloned.setDate(date.getDate() + diff))
  );
  return thursday;
}

export function getNdaysAfter(date: Date, number: number): Date {
  const cloned = convertTimezone_TW(new Date(date.toISOString()));
  return convertTimezone_TW(new Date(cloned.setDate(date.getDate() + number)));
}

export function getThisWeek(date: Date): Date[] {
  const thursday = getThursday(date);
  const result: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = getNdaysAfter(thursday, i);
    result.push(d);
  }
  return result;
}

export function getYYYYMMDD(date: Date): number {
  date = convertTimezone_TW(date);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return d + m * 100 + y * 10000;
}
