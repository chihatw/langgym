'use client';

import AudioPlayButton from '@/components/AudioPlayButton';
import { Button } from '@/components/ui/button';

import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { uploadAudioFile } from '@/features/storage/services/client';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { blobToAudioBuffer } from '@/utils';
import { Mic, Pause, Play, StopCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Record } from '../schema';
import { fetchRecordParams, insertRecord } from '../services/client';

type Props = {};

type FormProps = {
  blob: Blob | null; // blob は描画と無関係だが、ref で子コンポーネントに渡すのは難しい
  isRecording: boolean;
  audioBuffer: AudioBuffer | null;
  audio: HTMLAudioElement | null; // useEffect の中で定義をする必要がある;
  title: string;
  pitchStr: string;
};

const INITIAL_STATE: FormProps = {
  blob: null,
  isRecording: false,
  audioBuffer: null,
  audio: null,
  title: '',
  pitchStr: '',
};

// 描画と関係ない変数
type RefProps = {
  mediaRecorder: MediaRecorder | undefined;
};

const INITIAL_REF: RefProps = {
  mediaRecorder: undefined,
};

const RecordForm = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // streamと連携してマイクを切るため
  const ref = useRef(INITIAL_REF);

  // audio は client side で作成
  useEffect(() => {
    setValue((prev) => ({ ...prev, audio: new Audio() }));
  }, []);

  // initialize
  useEffect(() => {
    (async () => {
      const recordParams = await fetchRecordParams();

      if (!recordParams) {
        setValue(INITIAL_STATE);
        return;
      }

      setValue((prev) => ({
        ...prev,
        title: recordParams.title,
        pitchStr: recordParams.pitchStr,
      }));
    })();
  }, []);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();

    const channel = supabase
      .channel('record params')
      .on(
        'postgres_changes',
        { schema: 'public', table: 'record_params', event: 'UPDATE' },
        (preload) => {
          const updated = preload.new;
          const { title, pitchStr } = updated;

          setValue((prev) => ({
            ...prev,
            title: title,
            pitchStr: pitchStr,
            blob: null,
            audioBuffer: null,
            isRecording: false,
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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

    // local
    setValue((prev) => ({
      ...prev,
      blob,
      audioBuffer,
    }));

    const path = `anon/${performance.now()}.mp3`; // anon の前に「/」は不要

    // storage
    const errMsg = await uploadAudioFile(blob, path);
    if (errMsg) {
      console.error(errMsg);
      return;
    }

    // remote
    const record: Omit<Record, 'id' | 'created_at'> = {
      title: value.title,
      pitchStr: value.pitchStr,
      path,
    };
    insertRecord(record);
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
      isRecording: false,
      isChecking: true,
      audio: { ...prev.audio!, srcObject: null },
    }));
  };

  const handleClick = () => {
    value.isRecording ? stop() : start();
  };

  return (
    <div className='mx-auto max-w-md flex flex-col gap-12 w-full'>
      <div className='text-center text-2xl font-extrabold h-8'>
        {value.title}
      </div>
      <div className='p-2 rounded flex justify-center bg-white/60 min-h-14'>
        <SentencePitchLine pitchStr={value.pitchStr} />
      </div>
      <div className='grid items-center gap-32 justify-center'>
        {value.audioBuffer ? (
          <AudioPlayButton
            audioBuffer={value.audioBuffer}
            PlayIcon={<Play className='w-24 h-24' />}
            PauseIcon={<Pause className='w-24 h-24' />}
            size={'icon'}
            variant={'ghost'}
            className='w-24 h-24 rounded-full p-4'
          />
        ) : (
          <div className='flex justify-center items-center'>
            <div
              className={cn(
                'w-5 h-5 rounded-full mr-2',
                value.isRecording ? 'bg-red-500' : 'bg-white'
              )}
            />
            <Button
              size='icon'
              variant='ghost'
              className='rounded-full w-24 h-24 p-4'
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
        )}
      </div>
    </div>
  );
};

export default RecordForm;
