import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import { WorkoutFormProps } from './WorkoutForm';
import WorkoutRow from './WorkoutRow';

type Props = {
  value: WorkoutFormProps;
  setValue: Dispatch<SetStateAction<WorkoutFormProps>>;
};

const WorkoutPrepare = ({ value, setValue }: Props) => {
  return (
    <div className='grid'>
      <div className='grid gap-4 mb-8'>
        {value.items.map((item, index) => (
          <WorkoutRow key={index} item={item} index={index} />
        ))}
      </div>
      <Button
        onClick={() => setValue((prev) => ({ ...prev, state: 'record' }))}
      >
        錄音
      </Button>
    </div>
  );
};

export default WorkoutPrepare;
