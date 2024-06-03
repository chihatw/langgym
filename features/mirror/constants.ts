import { MirrorWorkout } from './schema';

export const MIRROR_WORKOUTS_LABEL = '鏡像數字';

export const MIRROR_WORKOUT_ITEMS = [
  [91518, 61145],
  [52788, 21138],
  [17078, 26341],
  [45998, 48704],
  [31366, 12187],
  [12318, 32378],
  [68111, 86089],
  [42998, 24869],
  [72365, 61511],
  [34170, 42481],
];

export const MIRROR_WORKOUTS: MirrorWorkout[] = [
  {
    id: 1,
    uid: '5aa6c2a4-a72f-42f8-80d8-5adc71587a0d',
    items: JSON.stringify(MIRROR_WORKOUT_ITEMS),
    isDev: true,
  },
];
