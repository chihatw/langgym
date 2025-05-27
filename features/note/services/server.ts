import { createClient } from '@/utils/supabase/server';
import { Note, NoteAudioPath } from '../schema';

export async function fetchNote(): Promise<Note | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('note')
    .select()
    .limit(1)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  return data;
}

export async function fetchNoteAudioPaths(): Promise<NoteAudioPath[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('note_audio_paths').select();

  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}
