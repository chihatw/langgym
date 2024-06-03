'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { MirrorWorkoutResult } from '../schema';

export async function insertMirrorWorkoutResult(
  result: Omit<MirrorWorkoutResult, 'id'>
): Promise<number | undefined> {
  const supabase = createSupabaseServerActionClient();

  const { data, error } = await supabase
    .from('mirror_workout_results')
    .insert(result)
    .select()
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  revalidatePath('/');

  return data.id;
}
