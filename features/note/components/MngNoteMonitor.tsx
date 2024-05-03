import { Record } from '@/features/record/schema';
import { NoteAudioPath } from '../schema';
import { buildNoteLines } from '../services/utils';
import MngNoteFormRow from './MngNoteFormRow';

type Props = {
  text: string;
  records: Record[];
  noteAudioPaths?: NoteAudioPath[];
};

const MngNoteMonitor = ({ text, records, noteAudioPaths }: Props) => {
  const noteLines = buildNoteLines(text);
  return (
    <div className='grid gap-4'>
      {noteLines.length &&
        noteLines.map((line, index) => {
          if (!line.label && !line.pitchStr) return null;
          const audioPath = noteAudioPaths?.find(
            (item) => item.index === index
          );
          return (
            <MngNoteFormRow
              key={index}
              index={index}
              label={line.label}
              records={records}
              pitchStr={line.pitchStr}
              audioPath={audioPath?.audioPath}
            />
          );
        })}
    </div>
  );
};

export default MngNoteMonitor;
