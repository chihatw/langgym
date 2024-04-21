'use server';
import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { WorkoutFirstAudioPath, WorkoutSecondAudioPath } from '../schema';

export async function insertWorkoutFirstAudioPath(
  item: Omit<WorkoutFirstAudioPath, 'id'>
) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('workout_first_audio_paths')
    .insert(item)
    .select()
    .single();

  if (error) {
    return error.message;
  }

  revalidatePath('/');
  revalidatePath('/workout/1');
}

export async function insertWorkoutSecondAudioPath(
  item: Omit<WorkoutSecondAudioPath, 'id'>
) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('workout_second_audio_paths')
    .insert(item)
    .select()
    .single();

  if (error) {
    return error.message;
  }

  revalidatePath('/');
  revalidatePath('/workout/2');
  revalidatePath('/workout/3');
}

export async function deleteWorkoutFirstAudioPathByItemId(itemId: number) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('workout_first_audio_paths')
    .delete()
    .eq('itemId', itemId);

  if (error) {
    console.log(error.message);
    return;
  }

  revalidatePath('/');
  revalidatePath('/workout/1');
}

export async function deleteWorkoutSecondAudioPath(id: number) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('workout_second_audio_paths')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error.message);
    return;
  }

  revalidatePath('/');
  revalidatePath('/workout/2');
  revalidatePath('/workout/3');
}
