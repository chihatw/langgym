import AudioPlayButton from '@/components/AudioPlayButton';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { uploadAudioFile } from '@/features/article/services/client';
import { calcBeatCount, calcBpm } from '@/features/pitchLine/services/utils';
import { cn } from '@/lib/utils';
import { PauseCircle, Play } from 'lucide-react';
import { Lato } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo, useTransition } from 'react';
import { WorkoutRecord, WorkoutRecordRow } from '../../schema';
import { insertWorkoutRecord } from '../../services/actions';
import { WorkoutFormProps } from './WorkoutForm';
import WorkoutRecordPaneMonitor from './WorkoutRecordPaneMonitor';

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '900'],
});

type Props = {
  value: WorkoutFormProps;
  setValue: Dispatch<SetStateAction<WorkoutFormProps>>;
};

const INTERVAL = 1; // bpm 計算時、行間に加える拍数

const WorkoutCheckAudioModal = ({ value, setValue }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const workoutItem = useMemo(() => value.items.at(0), [value]);

  const bpm = useMemo(() => {
    if (!value.audioBuffer || !workoutItem) return 0;
    let beats = value.items.reduce((acc, cur, index) => {
      const isLast = index === value.items.length - 1;
      const curBeat = calcBeatCount(cur.pitchStr!);
      return acc + curBeat + (!isLast ? INTERVAL : 0);
    }, 0);

    // isReview の処理
    if (workoutItem.isReview) {
      beats = beats * 2;
    }

    if (!beats) return 0;
    return Math.round((beats * 60) / value.audioBuffer.duration);
  }, [value, workoutItem]);

  const handleReset = () => {
    setValue((prev) => ({
      ...prev,
      blob: null,
      audioBuffer: null,
      isChecking: false,
      elapsedTime: 0,
    }));
  };

  const action = async () => {
    if (!workoutItem) return;
    startTransition(async () => {
      if (!value.blob) return;

      const audioPath = `workout/${workoutItem.workoutId}.mp3`;

      // storage
      const errMsg = await uploadAudioFile(value.blob, audioPath);
      if (errMsg) {
        console.error(errMsg);
        return;
      }

      const bpm = calcBpm(value, workoutItem.isReview!);

      const record: Omit<WorkoutRecord, 'id' | 'created_at'> = {
        workoutId: workoutItem.workoutId!,
        bpm,
        audioPath,
      };

      const rows: Omit<
        WorkoutRecordRow,
        'id' | 'workoutRecordId' | 'created_at'
      >[] = value.shuffledIds.map((id, index) => ({
        index,
        workoutItemId: id,
      }));

      // remote
      await insertWorkoutRecord(record, rows);

      // local
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

        setValue((prev) => ({
          ...prev,
          isChecking: false,
          isRecording: false,
          elapsedTime: 0,
        }));
      }}
    >
      <DialogContent className='h-screen overflow-scroll py-20 max-h-[calc(100vh-80px)]'>
        <div className='grid'>
          <div className='grid grid-cols-[1fr,auto,1fr] items-end gap-2'>
            <div />
            <div
              className={cn('flex text-8xl font-extrabold ', lato.className)}
            >
              {bpm}
            </div>
            <div className={cn('text-slate-700  pb-2', lato.className)}>
              bpm
            </div>
          </div>

          <WorkoutRecordPaneMonitor value={value} />

          {!!value.audioBuffer ? (
            <div className='flex justify-center items-center py-10'>
              <AudioPlayButton
                size={'icon'}
                variant={'ghost'}
                className='rounded-full w-24 h-24'
                audioBuffer={value.audioBuffer}
                PlayIcon={<Play className='w-24 h-24' />}
                PauseIcon={<PauseCircle className='w-24 h-24' />}
              />
            </div>
          ) : null}
          <div className='grid gap-8'>
            <Button variant={'outline'} onClick={handleReset}>
              重新錄音
            </Button>
            <SubmitServerActionButton action={action} isPending={isPending}>
              錄音檔沒有唸錯
            </SubmitServerActionButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutCheckAudioModal;
