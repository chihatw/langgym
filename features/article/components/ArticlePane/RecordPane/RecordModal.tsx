'use client';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { SentenceView } from '@/features/article/schema';
import { Dispatch, SetStateAction } from 'react';
import SentenceRow from '../SentenceRow';
import RecordModalCheckPane from './RecordModalCheckPane';
import RecordModalRecordPane from './RecordModalRecordPane';
import { RecordFormProps } from './RecordPane';

type Props = {
  value: RecordFormProps;
  setValue: Dispatch<SetStateAction<RecordFormProps>>;
  sentence: SentenceView;
  audioBuffer: AudioBuffer | null;
};

// 描画と関係ない変数
type RefProps = {
  mediaRecorder: MediaRecorder | undefined;
};

const INITIAL_REF: RefProps = {
  mediaRecorder: undefined,
};

const RecordModal = ({ value, setValue, sentence, audioBuffer }: Props) => {
  return (
    <Dialog
      open={value.open}
      onOpenChange={(open) => {
        if (open) return;
        setValue((prev) => ({
          ...prev,
          open: false,
          blob: null,
          audioBuffer: null,
        }));
      }}
    >
      <DialogTrigger asChild>trigger</DialogTrigger>
      <DialogContent>
        <div className='grid gap-8'>
          <SentenceRow sentence={sentence} audioBuffer={audioBuffer} />
          {!value.audioBuffer ? (
            <RecordModalRecordPane value={value} setValue={setValue} />
          ) : (
            <RecordModalCheckPane
              value={value}
              setValue={setValue}
              sentence={sentence}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecordModal;
