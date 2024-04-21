'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { blobToAudioBuffer } from '@/utils';
import { PlayCircle, RefreshCw, StopCircle } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

import WorkoutSecondCheckAudioModal from './WorkoutSecondCheckAudioModal';
import { WorkoutSecondFormProps } from './WorkoutSecondPane';

type Props = {
  value: WorkoutSecondFormProps;
  setValue: Dispatch<SetStateAction<WorkoutSecondFormProps>>;
};

// 描画と関係ない変数
type RefProps = {
  mediaRecorder: MediaRecorder | undefined;
};

const INITIAL_REF: RefProps = {
  mediaRecorder: undefined,
};

const WorkoutSecondRecord = ({ value, setValue }: Props) => {
  // streamと連携してマイクを切るため
  const ref = useRef(INITIAL_REF);

  useEffect(() => {
    setValue((prev) => ({ ...prev, audio: new Audio() }));
  }, [setValue]);

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

    // データが入力された時の処理
    mediaRecorder.ondataavailable = handleDataVaiable;

    // 録音開始
    mediaRecorder.start();

    setValue((prev) => ({
      ...prev,
      isRecording: true,
      audio: {
        ...prev.audio!,
        srcObject: stream,
      },
    }));
  };

  const stop = () => {
    const { mediaRecorder } = ref.current;
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
    if (value.isRecording) {
      if (value.index === value.shuffledIds.length - 1) {
        stop();
        return;
      }

      setValue((prev) => ({ ...prev, index: prev.index + 1 }));

      return;
    }
    start();
  };

  return (
    <>
      <div className='grid gap-0'>
        <div className='pl-4 pb-4'>
          <Button
            variant={'link'}
            className='p-0 m-0'
            onClick={() => setValue((prev) => ({ ...prev, state: 'prepare' }))}
          >
            戻る
          </Button>
        </div>
        <div className='mx-4 text-xs text-slate-500 pb-8'>
          <div className='mb-4 grid'>
            <div className='flex gap-1 items-center'>
              <span>・</span>
              <PlayCircle className='w-4 h-4' />
              <span>をクリックすると、開始します</span>
            </div>
            <div className='flex gap-1 items-center'>
              <span>・</span>
              <RefreshCw className='w-4 h-4' />
              <span>をクリックすると、次のカードが表示されます</span>
            </div>
            <div className='flex gap-1 items-center'>
              <span>・</span>
              <StopCircle className='w-4 h-4' />
              <span>をクリックすると、終了します</span>
            </div>
          </div>
        </div>
        <div className='h-60 bg-white/60 rounded grid grid-rows-[1fr,auto]'>
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
                <StopCircle className='w-20 h-20' />
              ) : (
                <RefreshCw className='w-20 h-20 animate-spin' />
              )
            ) : (
              <PlayCircle className='w-20 h-20' />
            )}
          </Button>
        </div>
      </div>
      <WorkoutSecondCheckAudioModal value={value} setValue={setValue} />
    </>
  );
};

export default WorkoutSecondRecord;
