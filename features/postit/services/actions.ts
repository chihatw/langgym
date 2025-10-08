'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function revalidatePostitItem(postitId: number) {
  revalidatePath(`/postit/${postitId}`);
}

export async function revalidatePostitNote(postitNoteId: number) {
  revalidatePath(`/postit/note/${postitNoteId}`);
}

export async function updatePostItWorkoutChecked(
  id: number,
  checked: number[]
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('postit_workouts')
    .update({ checked })
    .eq('id', id);

  if (error) {
    console.log(error.message);
    return;
  }

  revalidatePath('/postit/workout');
}

export async function updatePostItWorkoutJapanese(
  id: number,
  japanese: string
): Promise<string | undefined> {
  const supabase = await createClient();

  const { error } = await supabase
    .from('postit_workouts')
    .update({ japanese })
    .eq('id', id);

  if (error) {
    return error.message;
  }

  revalidatePath('/postit/workout');
  return;
}

export async function revalidatePostitWorkout() {
  revalidatePath('/postit/workout');
}

export async function updatePostItWorkoutThreeTopicsImageUrls(
  id: number,
  three_topics_image_urls: string[]
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('postit_workouts')
    .update({ three_topics_image_urls })
    .eq('id', id);

  if (error) {
    console.log(error.message);
    return;
  }

  revalidatePath('/postit/workout');
}
