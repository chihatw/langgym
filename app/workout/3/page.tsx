import Breadcrumb from '@/components/Breadcrumb';
import { WORKOUT_LABELS } from '@/features/workout/constants';

type Props = {};

const WorkoutThirdPage = (props: Props) => {
  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label={WORKOUT_LABELS.at(2)} />
    </div>
  );
};

export default WorkoutThirdPage;
