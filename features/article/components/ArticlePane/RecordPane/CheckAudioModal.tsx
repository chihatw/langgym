'use client';
import AudioPlayButton from '@/components/AudioPlayButton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, PauseCircle, Play } from 'lucide-react';
import { Dispatch, SetStateAction, useTransition } from 'react';
import { ArticleMark, Sentence } from '../../../schema';
import { upsertArticleRecordedAssignment } from '../../../services/actions';
import { uploadAudioFile } from '../../../services/client';
import { RecordFormProps } from './RecordPane';
import RecordPaneSentenceMonitor from './RecordPaneSentenceMonitor';

type Props = {
  line: number;
  value: RecordFormProps;
  sentence: Sentence;
  articleId: number;
  audioBuffer: AudioBuffer | null;
  articleMark?: ArticleMark;
  setValue: Dispatch<SetStateAction<RecordFormProps>>;
};

const CheckAudioModal = ({
  value,
  sentence,
  articleId,
  line,
  audioBuffer,
  articleMark,
  setValue,
}: Props) => {
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
      if (!value.blob) return;

      const audioPath = `assignments/${articleId}/${line}.mp3`;

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
        <RecordPaneSentenceMonitor
          sentence={sentence}
          audioBuffer={audioBuffer}
          articleMark={articleMark}
        />
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
        <form action={action}>
          <Button
            type='submit'
            disabled={isPending}
            className='flex items-center gap-x-0.5 w-full'
          >
            錄音檔沒有唸錯
            {isPending ? <Loader2 className='animate-spin' /> : null}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckAudioModal;
