import { createClient } from '@/utils/supabase/server';
import { MirrorWorkoutResult } from '../schema';

export async function fetchMirrorWorkoutResults(): Promise<
  MirrorWorkoutResult[]
> {
  const supabase = await createClient();
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
  const supabase = await createClient();
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

export async function fetchMirrorWorkoutResultsByUid(
  uid: string
): Promise<MirrorWorkoutResult[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('mirror_workout_results')
    .select()
    .order('created_at')
    .eq('uid', uid);

  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((i) => ({ ...i, created_at: new Date(i.created_at) }));
}

export async function fetchLatestMirrorWorkoutResultByUid(
  uid: string
): Promise<MirrorWorkoutResult | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('mirror_workout_results')
    .select()
    .eq('uid', uid)
    .order('created_at', { ascending: false })
    .limit(1)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  return { ...data, created_at: new Date(data.created_at) };
}
