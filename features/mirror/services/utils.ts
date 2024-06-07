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

export function getResultDates(results: MirrorWorkoutResult[]) {
  const days = results.map((r) => r.created_at.getDate());
  const uniqDays = Array.from(new Set(days));
  if (uniqDays.length < 2) {
    return uniqDays;
  }
  return uniqDays.sort((a, b) => a - b);
}
