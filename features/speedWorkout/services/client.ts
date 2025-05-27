import { createClient } from '@/utils/supabase/client';
import { SpeedWorkout } from '../schema';

export async function fetchSpeedWorkout(): Promise<SpeedWorkout | undefined> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('speed_workout')
    .select()
    .limit(1)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

export async function updateSpeedWorkoutSelectedId(
  id: number,
  selectedId: number
) {
  const supabase = createClient();
  const { error } = await supabase
    .from('speed_workout')
    .update({ selectedId })
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }
}

export async function updateSpeedWorkoutIsRunning(
  id: number,
  isRunning: boolean
) {
  const supabase = createClient();
  const { error } = await supabase
    .from('speed_workout')
    .update({ isRunning, selectedItemId: null })
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }
}

export async function updateSpeedWorkoutSelectedItemId(
  id: number,
  selectedItemId: number | null
) {
  const supabase = createClient();
  const { error } = await supabase
    .from('speed_workout')
    .update({ selectedItemId })
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }
}
