import Breadcrumb from '@/components/Breadcrumb';
import { WORKOUT_LABELS } from '@/features/workout/constants';

type Props = {};

const WorkoutSecondPage = (props: Props) => {
  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label={WORKOUT_LABELS.at(1)} />
    </div>
  );
};

export default WorkoutSecondPage;
