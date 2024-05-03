'use client';
import MngPaneContainer from '@/components/MngPaneContainer';
import { Textarea } from '@/components/ui/textarea';
import { Record } from '@/features/record/schema';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { ChangeEvent, useEffect, useState } from 'react';
import { Note, NoteAudioPath } from '../schema';
import { updateNote } from '../services/client';
import MngNoteMonitor from './MngNoteMonitor';

type Props = {
  note: Note | undefined;
  records: Record[];
  noteAudioPaths: NoteAudioPath[];
};

type FormProps = Note & { records: Record[]; noteAudioPaths: NoteAudioPath[] };

const INITIAL_STATE: FormProps = {
  id: 0,
  text: '',
  records: [],
  noteAudioPaths: [],
};

const MngNoteForm = ({ note, records, noteAudioPaths }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // initialize
  useEffect(() => {
    if (!note) {
      setValue(INITIAL_STATE);
      return;
    }
    setValue((prev) => ({ ...prev, ...note }));
  }, [note]);

  // initialize
  useEffect(() => {
    setValue((prev) => ({ ...prev, records }));
  }, [records]);

  // initialize
  useEffect(() => {
    setValue((prev) => ({ ...prev, noteAudioPaths }));
  }, [noteAudioPaths]);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();

    const channel = supabase
      .channel('records')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'records',
        },
        (preload) => {
          const inserted = preload.new;

          const { id, title, pitchStr, path, created_at } = inserted;
          setValue((prev) => ({
            ...prev,
            records: [
              ...prev.records,
              {
                id,
                title,
                pitchStr,
                path,
                created_at: new Date(created_at),
              },
            ],
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    // local
    setValue((prev) => ({ ...prev, text }));

    // remote
    updateNote(value.id, text);
  };

  return (
    <MngPaneContainer label='Note'>
      <div className='grid gap-4'>
        <div className='grid gap-1 mx-2 '>
          <div className='text-xs text-slate-700'>
            ・文字とピッチラインの区切りは空行１つ挟む（２改行）
          </div>
          <div className='text-xs text-slate-700'>
            ・ピッチラインを表示せずにカードを分ける場合は空行３つ挟む（４改行）
          </div>
        </div>
        <Textarea value={value.text} onChange={handleChange} />
        {!!value.text ? (
          <MngNoteMonitor
            text={value.text}
            records={value.records}
            noteAudioPaths={value.noteAudioPaths}
          />
        ) : null}
      </div>
    </MngPaneContainer>
  );
};

export default MngNoteForm;
