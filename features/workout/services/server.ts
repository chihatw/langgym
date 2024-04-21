import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { WorkoutFirstAudioPath } from '../schema';

export async function fetchWorkoutFirstAudioPaths(): Promise<
  WorkoutFirstAudioPath[]
> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('workout_first_audio_paths')
    .select();

  if (error) {
    console.log(error);
    return [];
  }

  if (!data) return [];

  return data;
}
