'use client';
import { Button } from '@/components/ui/button';
import { blobToAudioBuffer } from '@/utils';
import { Mic, StopCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { WorkoutFirst } from '../../schema';
import WorkoutFirstCheckAudioModal from './WorkoutFirstCheckAudioModal';

type Props = {
  item: WorkoutFirst;
};

export type WorkoutFirstRecordFormProps = {
  open: boolean;
  blob: Blob | null; // blob は描画と無関係だが、ref で子コンポーネントに渡すのは難しい
  isChecking: boolean;
  isRecording: boolean;
  audioBuffer: AudioBuffer | null;
  audio: HTMLAudioElement | null; // useEffect の中で定義をする必要がある;
};

const INITIAL_STATE: WorkoutFirstRecordFormProps = {
  open: false,
  blob: null,
  isRecording: false,
  isChecking: false,
  audioBuffer: null,
  audio: null,
};

// 描画と関係ない変数
type RefProps = {
  mediaRecorder: MediaRecorder | undefined;
};

const INITIAL_REF: RefProps = {
  mediaRecorder: undefined,
};

const WorkoutFirstRecordPane = ({ item }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // streamと連携してマイクを切るため
  const ref = useRef(INITIAL_REF);

  useEffect(() => {
    setValue((prev) => ({ ...prev, audio: new Audio() }));
  }, []);

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
      isRecording: false,
      isChecking: true,
      audio: { ...prev.audio!, srcObject: null },
    }));
  };

  const handleClick = () => {
    value.isRecording ? stop() : start();
  };

  if (value.open) {
    return (
      <>
        <div className='relative'>
          <div className='border-[0.5px] rounded p-2  flex justify-center items-center bg-slate-200'>
            <Button
              variant={'ghost'}
              size='icon'
              className='rounded-full w-24 h-24 '
              onClick={handleClick}
            >
              {value.isRecording ? (
                <StopCircle className='w-20 h-20' />
              ) : (
                <Mic className='w-20 h-20' />
              )}
            </Button>
          </div>
          <div className='absolute right-0 top-0'>
            <Button
              size={'icon'}
              variant={'ghost'}
              className='bg-transparent hover:bg-transparent'
              onClick={() => setValue((prev) => ({ ...prev, open: false }))}
            >
              <X />
            </Button>
          </div>
        </div>
        <WorkoutFirstCheckAudioModal
          value={value}
          item={item}
          setValue={setValue}
        />
      </>
    );
  }

  return (
    <Button
      variant={'outline'}
      onClick={() => setValue((prev) => ({ ...prev, open: true }))}
      className='bg-slate-200 hover:bg-slate-900 hover:text-white'
    >
      録音
    </Button>
  );
};

export default WorkoutFirstRecordPane;
