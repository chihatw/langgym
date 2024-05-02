'use client';

import BetterreadView from '@/features/betterread/components/BetterreadView/BetterreadView';
import PaperCupForm from '@/features/paperCup/components/PaperCupForm';
import RecordForm from '@/features/record/components/RecordForm';
import SpeedWorkoutCueForm from '@/features/speedWorkout/components/SpeedWorkoutCueForm/SpeedWorkoutCueForm';
import SpeedWorkoutForm from '@/features/speedWorkout/components/SpeedWorkoutForm';
import { useEffect, useState } from 'react';

type Props = {
  pageState: string;
};

type FormProps = {
  pageState: string;
};

const INITIAL_STATE: FormProps = {
  pageState: 'blank',
};

const PageSwitch = ({ pageState }: Props) => {
  const [value, setValue] = useState({
    ...INITIAL_STATE,
    pageState,
  });

  useEffect(() => {
    setValue((prev) => ({ ...prev, pageState }));
  }, [pageState]);

  switch (value.pageState) {
    case 'sokudokuRenshu':
      return <SpeedWorkoutForm />;
    case 'sokudokuCue':
      return <SpeedWorkoutCueForm />;
    case 'paperCups':
      return <PaperCupForm />;
    case 'ga_wo_ni':
      return <div>がをに</div>;
    case 'record':
      return <RecordForm />;
    case 'note':
      return <div>ノート</div>;
    case 'pitches':
      return <div>ピッチ</div>;
    case 'betterread':
      return <BetterreadView />;
    case 'blank':
      return <></>;
    default:
      return <div>{pageState}</div>;
  }
};

export default PageSwitch;
