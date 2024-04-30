'use client';

import SpeedWorkoutCueForm from '@/features/speedWorkout/components/SpeedWorkoutCueForm/SpeedWorkoutCueForm';
import SpeedWorkoutForm from '@/features/speedWorkout/components/SpeedWorkoutForm';
import { SpeedWorkout } from '@/features/speedWorkout/schema';
import { WorkoutItemView } from '@/features/workout/schema';
import { useEffect, useState } from 'react';

type Props = {
  pageState: string;
  speedWorkout: SpeedWorkout | undefined;
  workoutItems: WorkoutItemView[];
};

type FormProps = {
  pageState: string;
};

const INITIAL_STATE: FormProps = {
  pageState: 'blank',
};

const PageSwitch = ({ pageState, workoutItems, speedWorkout }: Props) => {
  const [value, setValue] = useState({
    ...INITIAL_STATE,
    pageState,
  });

  useEffect(() => {
    setValue((prev) => ({ ...prev, pageState }));
  }, [pageState]);

  switch (value.pageState) {
    case 'sokudokuRenshu':
      return (
        <SpeedWorkoutForm
          workoutItems={workoutItems}
          speedWorkout={speedWorkout}
        />
      );
    case 'sokudokuCue':
      return (
        <SpeedWorkoutCueForm
          speedWorkout={speedWorkout}
          workoutItems={workoutItems}
        />
      );
    case 'paperCups':
      return <div>紙コップ</div>;
    case 'ga_wo_ni':
      return <div>がをに</div>;
    case 'record':
      return <div>録音</div>;
    case 'note':
      return <div>ノート</div>;
    case 'pitches':
      return <div>ピッチ</div>;
    case 'betterread':
      return <div>課前準備</div>;
    case 'blank':
      return <></>;
    default:
      return <div>{pageState}</div>;
  }
};

export default PageSwitch;
