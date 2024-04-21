import AudioPlayButton from '@/components/AudioPlayButton';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { uploadAudioFile } from '@/features/article/services/client';
import { PauseCircle, Play } from 'lucide-react';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { WorkoutFirst } from '../../schema';
import { insertWorkoutFirstAudioPath } from '../../services/actions';
import { WorkoutFirstRecordFormProps } from './WorkoutFirstRecordPane';
import WorkoutFirstRecordPaneMonitor from './WorkoutFirstRecordPaneMonitor';

type Props = {
  value: WorkoutFirstRecordFormProps;
  item: WorkoutFirst;
  setValue: Dispatch<SetStateAction<WorkoutFirstRecordFormProps>>;
};

const WorkoutFirstCheckAudioModal = ({ value, item, setValue }: Props) => {
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
      const { id } = item;

      if (!value.blob) return;

      const audioPath = `workout/1/${id}.mp3`;

      const errMsg = await uploadAudioFile(value.blob, audioPath);
      if (errMsg) {
        console.log(errMsg);
        return;
      }

      await insertWorkoutFirstAudioPath({ path: audioPath, itemId: id });

      setValue((prev) => ({
        ...prev,
        blob: null,
        isChecking: false,
        audioBuffer: null,
      }));
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
        <WorkoutFirstRecordPaneMonitor item={item} />
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

export default WorkoutFirstCheckAudioModal;
