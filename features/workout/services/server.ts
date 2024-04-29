import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import {
  Workout,
  WorkoutFirstAudioPath,
  WorkoutItemView,
  WorkoutRecord,
  WorkoutRecordRowView,
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
    console.error(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchWorkoutsByUid(uid: string): Promise<Workout[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('workouts')
    .select()
    .eq('uid', uid)
    .eq('isDev', false)
    .order('created_at');
  if (error) {
    console.error(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchWorkoutRecordsByWorkoutIds(
  workoutIds: number[]
): Promise<WorkoutRecord[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('workout_records')
    .select()
    .in('workoutId', workoutIds);

  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
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
    console.error(error.message);
    return;
  }

  if (!data) return;

  return { ...data, created_at: new Date(data.created_at!) };
}

export async function fetchWorkoutItems(): Promise<WorkoutItemView[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('workout_items_view')
    .select()
    .order('index');
  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchWorkoutItemsByWorkoutId(
  workoutId: number
): Promise<WorkoutItemView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('workout_items_view')
    .select()
    .eq('workoutId', workoutId)
    .order('index');

  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchWorkoutRecordRowsByWorkoutId(
  id: number
): Promise<WorkoutRecordRowView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('workout_record_rows_view')
    .select()
    .eq('workoutId', id)
    .order('index');

  if (error) {
    console.error(error.message);
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
    console.error(error.message);
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
    console.error(error.message);
    return;
  }
  return data;
}
