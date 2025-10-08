import { createClient } from '@/utils/supabase/client';
import { MirrorWorkoutResult } from '../schema';

export async function fetchMirrorWorkoutResultsByUid(
  uid: string
): Promise<MirrorWorkoutResult[]> {
  const supabase = createClient();
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
