import { createSupabaseClientComponentClient } from '@/lib/supabase';

export async function updateSpeedWorkoutSelectedId(
  id: number,
  selectedId: number
) {
  const supabase = createSupabaseClientComponentClient();
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
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('speed_workout')
    .update({ isRunning })
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }
}
