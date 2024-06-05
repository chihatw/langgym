'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { MirrorWorkoutResult, MirrorWorkoutResultItem } from '../schema';

export async function insertMirrorWorkoutResult(
  result: Omit<MirrorWorkoutResult, 'id'>,
  selectedNumbers: number[],
  items: number[][],
  remoteWorkoutItems: string[]
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

  const resultItems: Omit<MirrorWorkoutResultItem, 'id'>[] =
    selectedNumbers.map((selectNumber, index) => {
      const numbers = items[index].sort((a, b) => a - b).join(',');

      const isCorrect = Math.max(...items[index]) === selectNumber;

      return {
        resultId: data.id,
        shuffledIndex: index,
        workoutItemIndex: remoteWorkoutItems.indexOf(numbers),
        isCorrect,
        lap: result.laps[index],
      };
    });

  const { error: error_items } = await supabase
    .from('mirror_workout_result_items')
    .insert(resultItems);

  if (error_items) {
    console.error(error_items.message);
    return;
  }

  revalidatePath('/');
  revalidatePath('/mng/mirror/list');
  revalidatePath(`/mirror/${result.workoutId}/${data.id}`);

  return data.id;
}
