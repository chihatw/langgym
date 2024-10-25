import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import {
  PostIt,
  PostItItem,
  PostItNote,
  PostItNoteItem,
  PostItWorkout,
} from '../schema';

export async function fetchPostItByUid(
  uid: string
): Promise<PostIt | undefined> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('postits')
    .select()
    .eq('uid', uid)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  if (!data) {
    return;
  }

  return data;
}

export async function fetchPostItItemsByPostitId(
  postitId: number
): Promise<PostItItem[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('postit_items')
    .select()
    .eq('postit_id', postitId)
    .order('index');

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data;
}

export async function fetchPostItNoteByUid(
  uid: string
): Promise<PostItNote | undefined> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('postit_notes')
    .select()
    .eq('uid', uid)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  if (!data) {
    return;
  }

  return data;
}

export async function fetchPostItNoteItemsByPostItNoteId(
  postit_note_id: number
): Promise<PostItNoteItem[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('postit_note_items')
    .select()
    .eq('postit_note_id', postit_note_id)
    .order('created_at');

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchPostItWorkoutByUid(
  uid: string
): Promise<PostItWorkout | undefined> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('postit_workouts')
    .select()
    .eq('uid', uid)
    .single();

  if (error) {
    console.log(error.message);
    return;
  }

  return data;
}
