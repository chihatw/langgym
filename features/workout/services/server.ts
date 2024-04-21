import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { WorkoutFirstAudioPath, WorkoutSecondAudioPath } from '../schema';

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

export async function fetchWorkoutSecondAudioPath(
  workoutIndex: number
): Promise<WorkoutSecondAudioPath | undefined> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('workout_second_audio_paths')
    .select()
    .eq('path', `workout/${workoutIndex}.mp3`)
    .single();
  if (error) {
    console.log(error);
    return;
  }
  return data;
}
