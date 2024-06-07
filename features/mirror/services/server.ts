import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { MIRROR_WORKOUT_REALTIME_ID } from '../constants';
import { MirrorWorkoutRealtime, MirrorWorkoutResult } from '../schema';

export async function fetchMirrorWorkoutResults(): Promise<
  MirrorWorkoutResult[]
> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('mirror_workout_results')
    .select();
  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((i) => ({ ...i, created_at: new Date(i.created_at) }));
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

  return {
    ...data,
    created_at: new Date(data.created_at),
  };
}

export async function fetchMirrorWorkoutResultByUid(
  uid: string
): Promise<MirrorWorkoutResult[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('mirror_workout_results')
    .select()
    .eq('uid', uid);

  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((i) => ({ ...i, created_at: new Date(i.created_at) }));
}

export async function fetchMirrorWorkoutRealtime(): Promise<
  MirrorWorkoutRealtime | undefined
> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('mirror_workout_realtime')
    .select()
    .eq('id', MIRROR_WORKOUT_REALTIME_ID)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  return data;
}
