import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { SpeedWorkout } from '../schema';

export async function fetchSpeedWorkout(): Promise<SpeedWorkout | undefined> {
  const supabase = createSupabaseServerComponentClient();

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
