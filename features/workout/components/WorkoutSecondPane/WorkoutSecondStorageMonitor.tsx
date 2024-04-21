'use client';

import AudioSlider from '@/components/AudioSlider';
import { Button } from '@/components/ui/button';
import { deleteAudioFile } from '@/features/article/services/client';
import { Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { deleteWorkoutSecondAudioPath } from '../../services/actions';
import { WorkoutSecondFormProps } from './WorkoutSecondPane';
import WorkoutSecondRow from './WorkoutSecondRow';

type Props = {
  value: WorkoutSecondFormProps;
  setValue: Dispatch<SetStateAction<WorkoutSecondFormProps>>;
};

const WorkoutSecondStorageMonitor = ({ value, setValue }: Props) => {
  const action = async () => {
    // storage
    const errMsg = await deleteAudioFile(value.storage!.path);
    if (errMsg) {
      console.log(errMsg);
      return;
    }

    // local
    setValue((prev) => ({
      ...prev,
      storage: undefined,
    }));

    // remote
    await deleteWorkoutSecondAudioPath(value.storage!.id);
  };

  if (!value.storage || !value.storage.audioBuffer) {
    return <></>;
  }

  return (
    <div className='pt-8 grid gap-4'>
      <div className='grid grid-cols-[1fr,auto]'>
        <AudioSlider
          audioBuffer={value.storage.audioBuffer}
          start={0}
          end={value.storage.audioBuffer.duration}
        />
        <form action={action}>
          <Button variant={'ghost'} size='icon'>
            <Trash2 />
          </Button>
        </form>
      </div>
      <div className='grid gap-4 mb-8'>
        {value.storage.shuffledIds.map((id, index) => {
          const item = value.items.find((item) => item.id === id)!;
          return <WorkoutSecondRow key={index} index={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default WorkoutSecondStorageMonitor;
