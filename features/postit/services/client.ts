import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { PostItItem, PostItNoteItem } from '../schema';

export async function insertPostitNoteItem(
  postitNoteItem: Omit<PostItNoteItem, 'id' | 'created_at'>
) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('postit_note_items')
    .insert(postitNoteItem);

  if (error) {
    console.error(error.message);
  }
}

export async function updatePostitItem(item: PostItItem) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('postit_items')
    .update({ image_url: item.image_url })
    .eq('id', item.id);

  if (error) {
    console.error(error.message);
  }
}
