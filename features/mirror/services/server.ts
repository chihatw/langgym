import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import {
  MirrorWorkout,
  MirrorWorkoutItemView,
  MirrorWorkoutResult,
  MirrorWorkoutResultItemView,
  MirrorWorkoutView,
} from '../schema';

export async function fetchMirrorWorkoutViews(): Promise<MirrorWorkoutView[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase.from('mirror_workouts_view').select();
  if (error) {
    console.log(error.message);
    return [];
  }

  return data;
}

export async function fetchMirrorWorkoutsByUid(
  uid: string
): Promise<MirrorWorkout[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('mirror_workouts')
    .select()
    .eq('uid', uid)
    .eq('isDev', false);
  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}

export async function fetchMirrorWorkoutById_Uid(
  id: number,
  uid: string
): Promise<MirrorWorkout | undefined> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('mirror_workouts')
    .select()
    .eq('id', id)
    .eq('uid', uid)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  return data;
}

export async function fetchMirrorWorkoutResultById(
  id: number
): Promise<MirrorWorkoutResult | undefined> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('mirror_workout_results')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  return data;
}

export async function fetchMirrorWorkoutResultsByWorkoutIds(
  workoutIds: number[]
): Promise<MirrorWorkoutResult[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('mirror_workout_results')
    .select()
    .in('workoutId', workoutIds);
  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}

export async function fetchMirrorWorkoutItemViewsByWorkoutId(
  workoutId: number
): Promise<MirrorWorkoutItemView[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('mirror_workout_items_view')
    .select()
    .eq('workoutId', workoutId)
    .order('index');

  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}
export async function fetchMirrorWorkoutResultItemViews(): Promise<
  MirrorWorkoutResultItemView[]
> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('mirror_workout_result_items_view')
    .select();
  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}
