'use client';
import AudioSlider from '@/components/AudioSlider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { downloadAudioFile } from '@/features/article/services/client';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { Record } from '@/features/record/schema';
import { blobToAudioBuffer } from '@/utils';
import { useEffect, useState } from 'react';
import { deleteNoteAudioPath, upsertNoteAudioPath } from '../services/client';

const NO_RECORD = 'no record';

type Props = {
  index: number;
  label: string;
  pitchStr: string;
  records: Record[];
  audioPath?: string;
};

type FormProps = {
  selectedId: string;
  audioPath: string;
  audioBuffer: AudioBuffer | null;
};

const INITIAL_STATE: FormProps = {
  audioPath: '',
  selectedId: NO_RECORD,
  audioBuffer: null,
};

const MngNoteFormRow = ({
  index,
  label,
  pitchStr,
  records,
  audioPath,
}: Props) => {
  const [value, setValue] = useState<FormProps>(INITIAL_STATE);

  // initialize
  useEffect(() => {
    if (!audioPath) {
      setValue(INITIAL_STATE);
      return;
    }

    (async () => {
      const selectedId = records.find((record) => record.path === audioPath)
        ?.id!;

      let audioBuffer: AudioBuffer | null = null;

      const blob = await downloadAudioFile(audioPath);
      if (!!blob) {
        audioBuffer = await blobToAudioBuffer(blob);
      }

      setValue((prev) => ({
        ...prev,
        selectedId: selectedId.toString(),
        audioBuffer,
        audioPath,
      }));
    })();
  }, [audioPath, records]);

  const handleChange = async (value: string) => {
    if (!records) return;
    // local
    let audioBuffer: AudioBuffer | null = null;
    let audioPath = '';
    const record = records.find((record) => record.id.toString() === value);

    if (record) {
      const blob = await downloadAudioFile(record.path);
      if (!!blob) {
        audioPath = record.path;
        audioBuffer = await blobToAudioBuffer(blob);
      }
    }
    setValue((prev) => ({
      ...prev,
      audioPath,
      selectedId: value,
      audioBuffer,
    }));

    if (value !== NO_RECORD) {
      // insert
      upsertNoteAudioPath(index, audioPath);
    } else {
      // delete
      deleteNoteAudioPath(index);
    }
  };
  return (
    <div className='grid gap-2 rounded bg-white/60 p-2'>
      <div className='grid gap-1'>
        {label.split('\n').map((line, index) => (
          <div key={index} className='text-xs'>
            {line}
          </div>
        ))}
      </div>
      {!!pitchStr ? (
        <div className='p-1 rounded bg-slate-200'>
          <SentencePitchLine pitchStr={pitchStr} />
        </div>
      ) : null}

      <div className='grid gap-1'>
        <Select value={value.selectedId} onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue placeholder='record' />
          </SelectTrigger>
          <SelectContent>
            {[{ id: NO_RECORD, title: NO_RECORD }, ...records].map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {value.selectedId !== NO_RECORD ? (
          <div className='grid grid-1 p-2 rounded border'>
            <SentencePitchLine
              pitchStr={
                records.find((item) => item.id.toString() === value.selectedId)!
                  .pitchStr
              }
            />
          </div>
        ) : null}
      </div>

      {value.audioBuffer ? (
        <AudioSlider
          audioBuffer={value.audioBuffer}
          start={0}
          end={value.audioBuffer.duration}
        />
      ) : null}
    </div>
  );
};

export default MngNoteFormRow;
