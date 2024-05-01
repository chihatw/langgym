import PageStateForm from '@/features/pageState/components/PageStateForm';
import { fetchPageStates } from '@/features/pageState/services/server';
import MngPaperCupForm from '@/features/paperCup/components/MngPaperCupForm/MngPaperCupForm';
import { fetchPaperCupParams } from '@/features/paperCup/services/server';
import MngOpenForm from '@/features/realtime/components/MngOpenForm';

import MngSpeedWorkoutForm from '@/features/speedWorkout/components/MngSpeedWorkoutForm';
import { fetchSpeedWorkout } from '@/features/speedWorkout/services/server';
import { fetchWorkoutItems } from '@/features/workout/services/server';

type Props = {};

const page = async (props: Props) => {
  const pageStates = await fetchPageStates();
  const speedWorkout = await fetchSpeedWorkout();
  const workoutItems = await fetchWorkoutItems();
  const paperCupParams = await fetchPaperCupParams();

  return (
    <div className='grid gap-8'>
      <MngOpenForm pageStates={pageStates} />
      <PageStateForm pageStates={pageStates} />
      <MngSpeedWorkoutForm
        speedWorkout={speedWorkout}
        workoutItems={workoutItems}
      />
      <MngPaperCupForm params={paperCupParams} />
    </div>
  );
};

export default page;
