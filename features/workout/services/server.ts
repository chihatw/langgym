import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import {
  Workout,
  WorkoutFirstAudioPath,
  WorkoutSecondAudioPath,
  WorkoutView,
} from '../schema';

export async function fetchWorkouts(): Promise<WorkoutView[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('workouts_view')
    .select()
    .order('created_at', { ascending: false });
  if (error) {
    console.log(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchWorkoutById(
  id: number
): Promise<Workout | undefined> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('workouts')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.log(error.message);
    return;
  }

  if (!data) return;

  return { ...data, created_at: new Date(data.created_at!) };
}

export async function fetchWorkoutItemsByWorkoutId(workoutId: number) {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('workout_items')
    .select()
    .order('index')
    .eq('workoutId', workoutId);
  if (error) {
    console.log(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

/**
 * temp
 */

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
