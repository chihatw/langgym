'use client';
import AudioPlayButton from '@/components/AudioPlayButton';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { uploadAudioFile } from '@/features/article/services/client';
import { PauseCircle, Play } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { insertWorkoutSecondAudioPath } from '../../services/actions';
import { WorkoutSecondFormProps } from './WorkoutSecondPane';
import WorkoutSecondRecordPaneMonitor from './WorkoutSecondRecordPaneMonitor';

type Props = {
  value: WorkoutSecondFormProps;
  setValue: Dispatch<SetStateAction<WorkoutSecondFormProps>>;
};

const WorkoutSecondCheckAudioModal = ({ value, setValue }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleReset = () => {
    setValue((prev) => ({
      ...prev,
      blob: null,
      audioBuffer: null,
      isChecking: false,
    }));
  };

  const action = async () => {
    startTransition(async () => {
      if (!value.blob) return;

      const audioPath = `workout/${value.workoutIndex}.mp3`;

      const errMsg = await uploadAudioFile(value.blob, audioPath);
      if (errMsg) {
        console.error(errMsg);
        return;
      }

      await insertWorkoutSecondAudioPath({
        path: audioPath,
        shuffledIds: value.shuffledIds,
      });

      setValue((prev) => ({
        ...prev,
        blob: null,
        isChecking: false,
        audioBuffer: null,
      }));

      router.push('/');
    });
  };
  return (
    <Dialog
      open={value.isChecking && !!value.audioBuffer}
      onOpenChange={(open) => {
        if (open) return;

        setValue((prev) => ({ ...prev, isChecking: false }));
      }}
    >
      <DialogTrigger asChild>trigger</DialogTrigger>
      <DialogContent>
        <WorkoutSecondRecordPaneMonitor value={value} />
        {!!value.audioBuffer ? (
          <div className='flex justify-center items-center py-10'>
            <AudioPlayButton
              size={'icon'}
              variant={'ghost'}
              className='rounded-full w-24 h-24'
              audioBuffer={value.audioBuffer}
              PlayIcon={<Play className='w-20 h-20' />}
              PauseIcon={<PauseCircle className='w-20 h-20' />}
            />
          </div>
        ) : null}

        <Button variant={'outline'} onClick={handleReset}>
          重新錄音
        </Button>
        <SubmitServerActionButton action={action} isPending={isPending}>
          錄音檔沒有唸錯
        </SubmitServerActionButton>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutSecondCheckAudioModal;
