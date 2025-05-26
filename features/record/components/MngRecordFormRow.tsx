import AudioSlider from '@/components/AudioSlider';
import { Button } from '@/components/ui/button';

import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import {
  deleteAudioFile,
  downloadAudioFile,
} from '@/features/storage/services/client';
import { blobToAudioBuffer } from '@/utils';
import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Record } from '../schema';
import { deleteRecord } from '../services/client';

type Props = {
  record: Record;
  handleRemoveRecord: () => void;
};

type FormProps = { audioBuffer: AudioBuffer | null };

const INITIAL_STATE: FormProps = {
  audioBuffer: null,
};

const MngRecordFormRow = ({ record, handleRemoveRecord }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    (async () => {
      const blob = await downloadAudioFile(record.path);
      if (!blob) {
        setValue((prev) => ({ ...prev, audioBuffer: null }));
        return;
      }
      const audioBuffer = await blobToAudioBuffer(blob);
      setValue((prev) => ({ ...prev, audioBuffer }));
    })();
  }, [record]);

  const handleDelete = () => {
    // storage
    deleteAudioFile(record.path);

    // remote
    deleteRecord(record.id);

    // local
    handleRemoveRecord();
  };

  return (
    <div className='grid gap-1 bg-white/60 p-2 rounded'>
      <div className='text-xs'>{record.title}</div>
      <div className='text-xs'>
        {new Date(record.created_at).toLocaleTimeString()}
      </div>
      <SentencePitchLine pitchStr={record.pitchStr} />
      {value.audioBuffer ? (
        <div className='grid grid-cols-[1fr_auto]'>
          <AudioSlider
            audioBuffer={value.audioBuffer}
            start={0}
            end={value.audioBuffer.duration}
          />

          <Button size='icon' variant={'ghost'} onClick={handleDelete}>
            <Trash2 />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default MngRecordFormRow;
