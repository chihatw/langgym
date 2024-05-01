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
          isRecording: false,
        }));
      }}
    >
      <DialogTrigger asChild>trigger</DialogTrigger>
      <DialogContent className='grid gap-8 overflow-scroll py-20 max-h-[calc(100vh-80px)]'>
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
      </DialogContent>
    </Dialog>
  );
};

export default RecordModal;
