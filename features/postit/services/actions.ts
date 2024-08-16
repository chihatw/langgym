'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { PostItItem } from '../schema';

export async function revalidatePostitItem(postitId: number) {
  revalidatePath(`/postit/${postitId}`);
}

export async function revalidatePostitNote(postitNoteId: number) {
  revalidatePath(`/postit/note/${postitNoteId}`);
}

export async function resetPostItItemImageUrl(item: PostItItem) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('postit_items')
    .update({ image_url: null })
    .eq('id', item.id);

  if (error) {
    console.error(error.message);
    return;
  }

  revalidatePostitNote(item.postit_id);
}

export async function deletePostItNoteItem(id: number, postitNoteId: number) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('postit_note_items')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }

  revalidatePostitNote(postitNoteId);
}
