import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { blobToAudioBuffer } from '@/utils';
import { PlayCircle, RefreshCw, StopCircle } from 'lucide-react';
import { Lato } from 'next/font/google';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef } from 'react';
import WorkoutCheckAudioModal from './WorkoutCheckAudioModal';
import { WorkoutFormProps } from './WorkoutForm';

const lato = Lato({
  subsets: ['latin'],
  display: 'swap',
  weight: ['900'],
});

type Props = {
  value: WorkoutFormProps;
  setValue: Dispatch<SetStateAction<WorkoutFormProps>>;
};

// 描画と関係ない変数
type RefProps = {
  mediaRecorder: MediaRecorder | undefined;
  raf: number;
  startAt: number;
};

const INITIAL_REF: RefProps = {
  mediaRecorder: undefined,
  raf: 0,
  startAt: 0,
};

const WorkoutRecord = ({ value, setValue }: Props) => {
  const workoutItem = useMemo(() => value.items.at(0), [value]);

  const { seconds, one_tenth_seconds } = useMemo(() => {
    const seconds = Math.floor(value.elapsedTime / 1000);
    const one_tenth_seconds = Math.floor((value.elapsedTime % 1000) / 100);

    return { seconds, one_tenth_seconds };
  }, [value]);

  // streamと連携してマイクを切るため
  const ref = useRef(INITIAL_REF);

  useEffect(() => {
    setValue((prev) => ({ ...prev, audio: new Audio() }));
  }, [setValue]);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(ref.current.raf);
    };
  }, []);

  // 録音開始時
  const handleStart = () => {
    ref.current.startAt = performance.now();
    setValue((prev) => ({
      ...prev,
      isRecording: true,
    }));
    loop();
  };

  // 録音完了時
  const handleDataVaiable = async (event: BlobEvent) => {
    const blob = event.data;
    if (!blob) return;

    const audioBuffer = await blobToAudioBuffer(blob);
    if (!audioBuffer) return;

    setValue((prev) => ({
      ...prev,
      blob,
      audioBuffer,
      elapsedTime: audioBuffer.duration * 1000,
    }));
  };

  const start = async () => {
    if (!navigator.mediaDevices || !value.audio) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    const mediaRecorder = new MediaRecorder(stream);

    // streamと連携してマイクを切るため
    ref.current = {
      ...ref.current,
      mediaRecorder,
    };

    // 録音開始時の処理
    mediaRecorder.onstart = handleStart;

    // データが入力された時の処理
    mediaRecorder.ondataavailable = handleDataVaiable;

    // 録音開始
    mediaRecorder.start();

    setValue((prev) => ({
      ...prev,
      elapsedTime: 0,
      audio: {
        ...prev.audio!,
        srcObject: stream,
      },
    }));
  };

  const loop = () => {
    const elapsedTime = performance.now() - ref.current.startAt;
    setValue((prev) => ({ ...prev, elapsedTime }));

    ref.current.raf = requestAnimationFrame(loop);
  };

  const stop = () => {
    const { mediaRecorder, raf } = ref.current;

    cancelAnimationFrame(raf);

    if (!mediaRecorder || !value.audio) return;

    mediaRecorder.stop();

    const stream = value.audio.srcObject as MediaStream;
    stream.getTracks().forEach((track) => {
      track.stop();
    });

    // ブラウザのマイク使用中の表示を消すために必要
    ref.current = {
      ...ref.current,
      mediaRecorder: undefined,
    };

    setValue((prev) => ({
      ...prev,
      index: 0,
      isRecording: false,
      isChecking: true,
      audio: { ...prev.audio!, srcObject: null },
    }));
  };

  const handleClick = () => {
    if (!workoutItem) return;

    if (!value.isRecording) {
      start();
      return;
    }

    if (value.index === value.shuffledIds.length - 1) {
      stop();
      return;
    }

    setValue((prev) => ({ ...prev, index: prev.index + 1 }));
  };

  if (!workoutItem) return <></>;

  return (
    <>
      {/* has Modal */}
      <div className='grid gap-4'>
        <div className='flex justify-center'>
          <div className='flex items-center'>
            <div
              className={cn(
                'w-5 h-5 rounded-full  mr-4',
                value.isRecording ? 'bg-red-500' : 'bg-white'
              )}
            />
            <div className={cn('flex text-8xl  ', lato.className)}>
              <div>{seconds}</div>
              <div>.</div>
              <div>{one_tenth_seconds}</div>
            </div>
            <div className='w-9'></div>
          </div>
        </div>
        <div className='h-60 bg-white/60 rounded grid grid-rows-[1fr,auto] relative'>
          <div
            className={cn(
              'flex justify-center items-center ',
              !value.isRecording && 'opacity-0'
            )}
          >
            <div className='text-teal-600 text-xl'>
              {
                value.items.find(
                  (item) => item.id === value.shuffledIds.at(value.index)
                )?.chinese
              }
            </div>
          </div>
          <div className='flex gap-1 mx-2'>
            {value.shuffledIds.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'flex-1 h-1 rounded my-2',
                  value.isRecording && index <= value.index
                    ? 'bg-teal-600'
                    : 'bg-slate-200'
                )}
              />
            ))}
          </div>
        </div>
        <div className='text-center pt-4'>
          <Button
            variant={'ghost'}
            size='icon'
            className='rounded-full w-24 h-24 '
            onClick={handleClick}
          >
            {value.isRecording ? (
              value.index === value.shuffledIds.length - 1 ? (
                <StopCircle className='w-24 h-24' />
              ) : (
                <RefreshCw className='w-24 h-24 animate-spin' />
              )
            ) : (
              <PlayCircle className='w-24 h-24' />
            )}
          </Button>
        </div>
      </div>
      <WorkoutCheckAudioModal value={value} setValue={setValue} />
    </>
  );
};

export default WorkoutRecord;
