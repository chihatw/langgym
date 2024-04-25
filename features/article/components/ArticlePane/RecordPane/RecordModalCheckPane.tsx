'use client';
import AudioPlayButton from '@/components/AudioPlayButton';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Button } from '@/components/ui/button';
import { SentenceView } from '@/features/article/schema';
import { upsertArticleRecordedAssignment } from '@/features/article/services/actions';
import { uploadAudioFile } from '@/features/article/services/client';
import { PauseCircle, Play } from 'lucide-react';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { RecordFormProps } from './RecordPane';

type Props = {
  value: RecordFormProps;
  setValue: Dispatch<SetStateAction<RecordFormProps>>;
  sentence: SentenceView;
};

const RecordModalCheckPane = ({ value, setValue, sentence }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleReset = () => {
    setValue((prev) => ({
      ...prev,
      blob: null,
      audioBuffer: null,
      isRecording: false,
    }));
  };

  const action = async () => {
    startTransition(async () => {
      const { articleId, line } = sentence;

      if (!value.blob || articleId === null || line === null) return;

      const audioPath = `assignments/${articleId!}/${line!}.mp3`;

      const errMsg = await uploadAudioFile(value.blob, audioPath);
      if (errMsg) {
        console.log(errMsg);
        return;
      }
      const _errMsg = await upsertArticleRecordedAssignment(articleId, {
        articleId,
        line,
        audioPath,
      });
      if (_errMsg) {
        console.log(_errMsg);
        return;
      }

      setValue((prev) => ({
        ...prev,
        blob: null,
        audioBuffer: null,
        open: false,
        isRecording: false,
      }));
    });
  };

  return (
    <div className='grid gap-8'>
      <div className='flex justify-center items-center py-10'>
        <AudioPlayButton
          size={'icon'}
          variant={'ghost'}
          className='rounded-full w-24 h-24'
          audioBuffer={value.audioBuffer!}
          PlayIcon={<Play className='w-24 h-24' />}
          PauseIcon={<PauseCircle className='w-24 h-24' />}
        />
      </div>
      <Button variant={'outline'} onClick={handleReset}>
        重新錄音
      </Button>
      <SubmitServerActionButton action={action} isPending={isPending}>
        錄音檔沒有唸錯
      </SubmitServerActionButton>
    </div>
  );
};

export default RecordModalCheckPane;
