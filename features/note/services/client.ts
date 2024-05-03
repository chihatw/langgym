import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { Note, NoteAudioPath } from '../schema';

export async function fetchNote(): Promise<Note | undefined> {
  const supabase = createSupabaseClientComponentClient();
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
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase.from('note_audio_paths').select();

  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}

export async function updateNote(id: number, text: string) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase.from('note').update({ text }).eq('id', id);

  if (error) {
    console.error(error.message);
  }
}

export async function upsertNoteAudioPath(index: number, audioPath: string) {
  const supabase = createSupabaseClientComponentClient();

  // 既存のものがあれば、削除
  const { error: error_d } = await supabase
    .from('note_audio_paths')
    .delete()
    .eq('index', index);
  if (error_d) {
    console.error(error_d.message);
  }

  // 新規作成
  const { error } = await supabase
    .from('note_audio_paths')
    .insert({ index, audioPath });

  if (error) {
    console.error(error.message);
  }
}

export async function deleteNoteAudioPath(index: number) {
  const supabase = createSupabaseClientComponentClient();

  const { error: error_d } = await supabase
    .from('note_audio_paths')
    .delete()
    .eq('index', index);
  if (error_d) {
    console.error(error_d.message);
  }
}
