import { createClient } from '@/utils/supabase/client';
import { PostItItem, PostItNoteItem } from '../schema';

export async function insertPostitNoteItem(
  postitNoteItem: Omit<PostItNoteItem, 'id' | 'created_at'>
) {
  const supabase = createClient();

  const { error } = await supabase
    .from('postit_note_items')
    .insert(postitNoteItem);

  if (error) {
    console.error(error.message);
  }
}

export async function updatePostitItem(item: PostItItem) {
  const supabase = createClient();

  const { error } = await supabase
    .from('postit_items')
    .update({ image_url: item.image_url })
    .eq('id', item.id);

  if (error) {
    console.error(error.message);
  }
}

export async function updatePostItWorkoutThreeTopicsImageUrls(
  id: number,
  three_topics_image_urls: string[]
) {
  const supabase = createClient();
  const { error } = await supabase
    .from('postit_workouts')
    .update({ three_topics_image_urls })
    .eq('id', id);

  if (error) {
    console.log(error.message);
  }
}
