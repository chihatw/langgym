import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { MirrorWorkoutResultItemView } from '../../schema';
import MngMirrorWorkoutListWorkoutRow from './MngMirrorWorkoutListWorkoutRow';

type Props = {
  resultItems: MirrorWorkoutResultItemView[];
};

const MngMirrorWorkoutList = ({ resultItems }: Props) => {
  const workoutIds = Array.from(new Set(resultItems.map((i) => i.workoutId)));

  // console.log(json);
  // const data = json.map(buildResult);
  // const items = json2.map(buildItem);
  // console.log(items);
  // const temp: { [key: number]: number[] } = {};
  // for (const item of items) {
  //   temp[item.index] = temp[item.index]
  //     ? [...temp[item.index], item.number]
  //     : [item.number];
  // }
  // console.log(temp);

  // const numbersWorkoutItemIds: { [key: string]: number } = {};
  // for (const [key, value] of Object.entries(temp)) {
  //   numbersWorkoutItemIds[value.sort((a, b) => a - b).join(',')] =
  //     parseInt(key);
  // }

  // console.log(numbersWorkoutItemIds);

  // const results: Omit<MirrorWorkoutResultItem, 'id'>[] = [];

  // for (const workout of data) {
  //   for (let i = 0; i < workout.selectedNumbers.length; i++) {
  //     const selectedNumber = workout.selectedNumbers[i];
  //     const lap = workout.laps[i];
  //     const items = workout.items[i];
  //     const isCorrect = Math.max(...workout.items[i]) === selectedNumber;

  //     const key = items.sort((a: number, b: number) => a - b).join(',');
  //     const workoutItemIndex = numbersWorkoutItemIds[key];

  //     const result: Omit<MirrorWorkoutResultItem, 'id'> = {
  //       resultId: workout.id,
  //       shuffledIndex: i,
  //       workoutItemIndex,
  //       isCorrect,
  //       lap,
  //     };
  //     results.push(result);
  //   }
  // }

  // console.log(results);
  // for (const result of results) {
  //   console.log(
  //     [
  //       result.resultId,
  //       result.shuffledIndex,
  //       result.workoutItemIndex,
  //       result.isCorrect,
  //       result.lap,
  //     ].join(',')
  //   );
  // }

  return (
    <div className='grid gap-y-4'>
      <div className='text-2xl font-extrabold'> Mirror Workout List</div>
      <div>
        <Link href={'#'} className={buttonVariants()}>
          Create New Workout
        </Link>
      </div>
      <div className='grid'>
        {workoutIds.map((workoutId) => (
          <MngMirrorWorkoutListWorkoutRow
            key={workoutId}
            resultItems={resultItems.filter(
              (item) => item.workoutId === workoutId
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default MngMirrorWorkoutList;

// function buildResult({
//   id,
//   items,
//   selectedNumbers,
//   laps,
//   totalTime,
//   workoutId,
// }: {
//   id: string;
//   items: string;
//   selectedNumbers: string;
//   laps: string;
//   totalTime: string;
//   workoutId: string;
// }) {
//   return {
//     id: parseInt(id),
//     items: JSON.parse(items),
//     selectedNumbers: JSON.parse(selectedNumbers),
//     laps: JSON.parse(laps),
//     workoutId: parseInt(workoutId),
//   };
// }

// function buildItem({
//   id,
//   index,
//   number,
//   workoutId,
// }: {
//   id: string;
//   index: string;
//   number: string;
//   workoutId: string;
// }) {
//   return {
//     id: parseInt(id),
//     index: parseInt(index),
//     number: parseInt(number),
//     workoutId: parseInt(workoutId),
//   };
// }
