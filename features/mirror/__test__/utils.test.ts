import { INITIAL_MIRROR_WORKOUT_RESULT } from '../constants';
import { MirrorWorkoutResult } from '../schema';
import {
  buildMax,
  buildMin,
  buildMirrorWorkoutItems,
  buildRandomNumberSet,
  getCorrectRatio,
  getResultDates,
  randomNumber,
} from '../services/utils';

test('buildMin(0)', () => {
  expect(() => buildMin(0)).toThrow();
});

test('buidMin(1)', () => {
  expect(buildMin(1)).toEqual(0);
});

test('buidMin(2)', () => {
  expect(buildMin(2)).toEqual(10);
});

test('buidMin(3)', () => {
  expect(buildMin(3)).toEqual(100);
});

test('buidMin(4)', () => {
  expect(buildMin(4)).toEqual(1000);
});

test('buildMax(0)', () => {
  expect(() => buildMax(0)).toThrow();
});
test('buildMax(1)', () => {
  expect(buildMax(1)).toEqual(9);
});
test('buildMax(2)', () => {
  expect(buildMax(2)).toEqual(99);
});

test('randomNumber 1 >= 0', () => {
  for (let i = 0; i < 100; i++) {
    expect(randomNumber(1) >= 0).toBeTruthy();
  }
});

test('randomNumber 1 <= 9', () => {
  for (let i = 0; i < 100; i++) {
    expect(randomNumber(1) <= 9).toBeTruthy();
  }
});

test('randomNumber 5 >= 10000', () => {
  for (let i = 0; i < 100; i++) {
    expect(randomNumber(2) >= 10).toBeTruthy();
  }
});

test('randomNumber 5 <= 99999', () => {
  for (let i = 0; i < 100; i++) {
    expect(randomNumber(2) <= 99).toBeTruthy();
  }
});

test('buildRandomNumberSet 1', () => {
  for (let i = 0; i < 100; i++) {
    const [num_1, num_2] = buildRandomNumberSet(1);
    expect(num_1 !== num_2).toBeTruthy();
  }
});

test('buildRandomNumberSet 5', () => {
  for (let i = 0; i < 100; i++) {
    const [num_1, num_2] = buildRandomNumberSet(5);
    expect(num_1 !== num_2).toBeTruthy();
  }
});

test('buildMirrorWorkoutItems length', () => {
  const items = buildMirrorWorkoutItems(5, 10);
  expect(items.length).toBe(10);
});

describe('getCorrectRatio', () => {
  test('no items', () => {
    const wrongSelectedNumbers: number[] = [];
    const wrongItems: number[][] = [];
    expect(() => getCorrectRatio(wrongSelectedNumbers, wrongItems)).toThrow();
  });
  test('items too long', () => {
    const wrongSelectedNumbers = [0, 1, 2];
    const wrongItems = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
    expect(() => getCorrectRatio(wrongSelectedNumbers, wrongItems)).toThrow();
  });

  test('items too short', () => {
    const wrongSelectedNumbers = [0, 1, 2];
    const wrongItems = [
      [0, 0],
      [0, 0],
    ];
    expect(() => getCorrectRatio(wrongSelectedNumbers, wrongItems)).toThrow();
  });

  test('items match selectedNumber', () => {
    const selectedNumbers = [0, 1, 2];
    const items = [
      [0, 0],
      [0, 0],
      [0, 0],
    ];
    expect(() => getCorrectRatio(selectedNumbers, items)).not.toThrow();
  });

  test('all correct', () => {
    const selectedNumbers = [1, 2, 3];
    const items = [
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    expect(getCorrectRatio(selectedNumbers, items)).toEqual(100);
  });

  test('getCorrectRatio all correct', () => {
    const selectedNumbers = [1, 2, 3];
    const items = [
      [0, 1],
      [0, 2],
      [0, 3],
    ];
    expect(getCorrectRatio(selectedNumbers, items)).toEqual(100);
  });

  test('getCorrectRatio all incorrect', () => {
    const selectedNumbers = [1, 2, 3];
    const items = [
      [5, 1],
      [5, 2],
      [5, 3],
    ];
    expect(getCorrectRatio(selectedNumbers, items)).toEqual(0);
  });

  test('getCorrectRatio correct 33%', () => {
    const selectedNumbers = [1, 2, 3];
    const items = [
      [0, 1],
      [5, 2],
      [5, 3],
    ];
    expect(getCorrectRatio(selectedNumbers, items)).toEqual(33);
  });

  test('getCorrectRatio correct 67%', () => {
    const selectedNumbers = [1, 2, 3];
    const items = [
      [5, 1],
      [2, 1],
      [3, 1],
    ];
    expect(getCorrectRatio(selectedNumbers, items)).toEqual(67);
  });
});

describe('getResultDates', () => {
  test('one result', () => {
    const results: MirrorWorkoutResult[] = [
      { ...INITIAL_MIRROR_WORKOUT_RESULT, created_at: new Date('2024-06-07') },
    ];
    expect(getResultDates(results)).toEqual([7]);
  });

  test('one result return uniq days', () => {
    const results: MirrorWorkoutResult[] = [
      { ...INITIAL_MIRROR_WORKOUT_RESULT, created_at: new Date('2024-06-07') },
      { ...INITIAL_MIRROR_WORKOUT_RESULT, created_at: new Date('2024-06-07') },
      { ...INITIAL_MIRROR_WORKOUT_RESULT, created_at: new Date('2024-06-07') },
    ];
    expect(getResultDates(results)).toEqual([7]);
  });

  test('multi results', () => {
    const results: MirrorWorkoutResult[] = [
      { ...INITIAL_MIRROR_WORKOUT_RESULT, created_at: new Date('2024-06-08') },
      { ...INITIAL_MIRROR_WORKOUT_RESULT, created_at: new Date('2024-06-07') },
      { ...INITIAL_MIRROR_WORKOUT_RESULT, created_at: new Date('2024-06-07') },
    ];
    expect(getResultDates(results)).toEqual([7, 8]);
  });
});
