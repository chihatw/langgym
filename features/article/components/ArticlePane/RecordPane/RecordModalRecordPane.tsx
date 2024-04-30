'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { blobToAudioBuffer } from '@/utils';
import { Mic, StopCircle } from 'lucide-react';
import { Dispatch, SetStateAction, useRef } from 'react';
import { RecordFormProps } from './RecordPane';

type Props = {
  value: RecordFormProps;
  setValue: Dispatch<SetStateAction<RecordFormProps>>;
};

// 描画と関係ない変数
type RefProps = {
  mediaRecorder: MediaRecorder | undefined;
};

const INITIAL_REF: RefProps = {
  mediaRecorder: undefined,
};

const RecordModalRecordPane = ({ value, setValue }: Props) => {
  // streamと連携してマイクを切るため
  const ref = useRef(INITIAL_REF);

  // 録音開始時
  const handleStart = () => {
    setValue((prev) => ({
      ...prev,
      isRecording: true,
    }));
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
      audio: { ...prev.audio!, srcObject: null },
    }));
  };

  const handleClick = () => {
    value.isRecording ? stop() : start();
  };

  return (
    <div className='flex justify-center items-center'>
      <div
        className={cn(
          'w-5 h-5 rounded-full mr-2',
          value.isRecording ? 'bg-red-500' : 'bg-slate-200'
        )}
      />
      <Button
        variant={'ghost'}
        size='icon'
        className='rounded-full w-24 h-24 '
        onClick={handleClick}
      >
        {value.isRecording ? (
          <StopCircle className='w-24 h-24' />
        ) : (
          <Mic className='w-24 h-24' />
        )}
      </Button>
      <div className='w-7' />
    </div>
  );
};

export default RecordModalRecordPane;
