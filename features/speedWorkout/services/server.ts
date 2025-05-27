import { createClient } from '@/utils/supabase/server';
import { SpeedWorkout } from '../schema';

export async function fetchSpeedWorkout(): Promise<SpeedWorkout | undefined> {
  const supabase = await createClient();

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
