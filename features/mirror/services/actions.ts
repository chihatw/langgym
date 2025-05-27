'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { MirrorWorkoutResult } from '../schema';

export async function insertMirrorWorkoutResult(
  result: Omit<MirrorWorkoutResult, 'id'>
): Promise<number | undefined> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('mirror_workout_results')
    .insert({ ...result, created_at: result.created_at.toISOString() })
    .select()
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  revalidatePath('/', 'layout');

  return data.id;
}
