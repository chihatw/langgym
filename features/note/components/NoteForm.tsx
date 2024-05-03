'use client';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useMemo, useState } from 'react';
import { Note, NoteAudioPath } from '../schema';
import { fetchNote, fetchNoteAudioPaths } from '../services/client';
import { buildNoteLines } from '../services/utils';
import NoteFormRow from './NoteFormRow';

type Props = {};

type FormProps = {
  note: Note;
  noteAudioPaths: NoteAudioPath[];
};

const INITIAL_STATE: FormProps = {
  note: { id: 0, text: '' },
  noteAudioPaths: [],
};

const NoteForm = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const noteLines = useMemo(() => {
    return buildNoteLines(value.note.text);
  }, [value]);

  // initialize
  useEffect(() => {
    (async () => {
      const note = await fetchNote();
      if (!note) {
        setValue((prev) => ({ ...prev, note: { id: 0, text: '' } }));
        return;
      }

      setValue((prev) => ({ ...prev, note }));
    })();
  }, []);

  // initialize
  useEffect(() => {
    (async () => {
      const noteAudioPaths = await fetchNoteAudioPaths();
      setValue((prev) => ({ ...prev, noteAudioPaths }));
    })();
  }, []);

  // subscrive
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('note')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'note' },
        (preload) => {
          const updated = preload.new;
          const { id, text } = updated;
          setValue((prev) => ({ ...prev, note: { id, text } }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // subscrive
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('note audio paths')
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'note_audio_paths' },
        (preload) => {
          const deleted = preload.old;
          const { id } = deleted;
          setValue((prev) => ({
            ...prev,
            noteAudioPaths: prev.noteAudioPaths.filter(
              (item) => item.id !== id
            ),
          }));
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'note_audio_paths' },
        (preload) => {
          const inserted = preload.new;
          const { audioPath, id, index } = inserted;
          setValue((prev) => {
            return {
              ...prev,
              noteAudioPaths: [
                ...prev.noteAudioPaths,
                { id, audioPath, index },
              ],
            };
          });
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className='mx-auto max-w-md flex flex-col gap-12 w-full'>
      <div className='grid gap-4'>
        {noteLines.length &&
          noteLines.map((line, index) => {
            if (!line.label && !line.pitchStr) return null;
            const audioPath = value.noteAudioPaths?.find(
              (item) => item.index === index
            );
            return (
              <NoteFormRow
                key={index}
                label={line.label}
                pitchStr={line.pitchStr}
                audioPath={audioPath?.audioPath}
              />
            );
          })}
      </div>
    </div>
  );
};

export default NoteForm;
