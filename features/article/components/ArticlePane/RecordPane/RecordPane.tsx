'use client';

import { Button } from '@/components/ui/button';
import { downloadAudioFile } from '@/features/article/services/client';
import { blobToAudioBuffer } from '@/utils';
import { useEffect, useState } from 'react';
import { SentenceView } from '../../../schema';
import AssignmentMonitor from '../AssignmentMonitor';
import RecordModal from './RecordModal';

type Props = {
  sentence: SentenceView;
  audioBuffer: AudioBuffer | null; // RecordModal に渡す
};

export type RecordFormProps = {
  open: boolean;
  blob: Blob | null; // blob は描画と無関係だが、ref で子コンポーネントに渡すのは難しい
  isRecording: boolean;
  audioBuffer: AudioBuffer | null;
  audio: HTMLAudioElement | null; // useEffect の中で定義をする必要がある;
};

const INITIAL_STATE: RecordFormProps = {
  open: false,
  blob: null,
  isRecording: false,
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

const RecordPane = ({ sentence, audioBuffer }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const [assignmentAudioBuffer, setAssignmentAudioBuffer] =
    useState<AudioBuffer | null>(null);

  useEffect(() => {
    setValue((prev) => ({ ...prev, audio: new Audio() }));
  }, []);

  useEffect(() => {
    const { recorded_audioPath } = sentence;
    if (!recorded_audioPath) {
      setAssignmentAudioBuffer(null);
      return;
    }

    (async () => {
      const blob = await downloadAudioFile(recorded_audioPath);
      if (!blob) return;

      const audioBuffer = await blobToAudioBuffer(blob);
      if (!audioBuffer) return;

      setAssignmentAudioBuffer(audioBuffer);
    })();
  }, [sentence]);

  const { articleId, line, articleRecordedAssignmentId } = sentence;

  if (assignmentAudioBuffer) {
    return (
      <AssignmentMonitor
        audioBuffer={assignmentAudioBuffer}
        articleId={articleId!}
        line={line!}
        articleRecordedAssignmentId={articleRecordedAssignmentId!}
      />
    );
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => setValue((prev) => ({ ...prev, open: true }))}
        className='bg-slate-200 hover:bg-slate-900 hover:text-white'
      >
        録音
      </Button>
      <RecordModal
        value={value}
        sentence={sentence}
        setValue={setValue}
        audioBuffer={audioBuffer}
      />
    </>
  );
};

export default RecordPane;
