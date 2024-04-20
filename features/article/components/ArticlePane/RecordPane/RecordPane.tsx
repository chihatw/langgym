'use client';

import { Button } from '@/components/ui/button';
import { blobToAudioBuffer } from '@/utils';
import { Mic, StopCircle, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { SentenceView } from '../../../schema';
import CheckAudioModal from './CheckAudioModal';

type Props = {
  sentence: SentenceView;
  audioBuffer: AudioBuffer | null;
};

export type RecordFormProps = {
  open: boolean;
  blob: Blob | null; // blob は描画と無関係だが、ref で子コンポーネントに渡すのは難しい
  isChecking: boolean;
  isRecording: boolean;
  audioBuffer: AudioBuffer | null;
};

const INITIAL_STATE: RecordFormProps = {
  open: false,
  blob: null,
  isRecording: false,
  isChecking: false,
  audioBuffer: null,
};

// 描画と関係ない変数
type RefProps = {
  audio: HTMLAudioElement;
  mediaRecorder: MediaRecorder | undefined;
};

const INITIAL_REF: RefProps = {
  audio: new Audio(),
  mediaRecorder: undefined,
};

const RecordPane = ({ sentence, audioBuffer }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // streamと連携してマイクを切るため
  const ref = useRef(INITIAL_REF);

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
    if (!navigator.mediaDevices) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    const mediaRecorder = new MediaRecorder(stream);

    // streamと連携してマイクを切るため
    ref.current = {
      ...ref.current,
      mediaRecorder,
      audio: {
        ...ref.current.audio,
        srcObject: stream,
      },
    };

    // データが入力された時の処理
    mediaRecorder.ondataavailable = handleDataVaiable;

    // 録音開始
    mediaRecorder.start();

    setValue((prev) => ({ ...prev, isRecording: true }));
  };

  const stop = () => {
    const { mediaRecorder, audio } = ref.current;
    if (!mediaRecorder) return;

    mediaRecorder.stop();

    const stream = audio.srcObject as MediaStream;
    stream.getTracks().forEach((track) => {
      track.stop();
    });

    // ブラウザのマイク使用中の表示を消すために必要
    ref.current = {
      ...ref.current,
      mediaRecorder: undefined,
      audio: {
        ...ref.current.audio,
        srcObject: null,
      },
    };

    setValue((prev) => ({
      ...prev,
      isRecording: false,
      isChecking: true,
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
        <CheckAudioModal
          value={value}
          sentence={sentence}
          setValue={setValue}
          audioBuffer={audioBuffer}
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

export default RecordPane;
