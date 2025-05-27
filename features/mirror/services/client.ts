import { createClient } from '@/utils/supabase/client';
import { MirrorWorkoutRealtime, MirrorWorkoutResult } from '../schema';

export async function updateMirrorWorkoutRealtime({
  id,
  isMirror,
  selectedId,
}: MirrorWorkoutRealtime) {
  const supabase = createClient();

  const { error } = await supabase
    .from('mirror_workout_realtime')
    .update({ isMirror, selectedId })
    .eq('id', id);
  if (error) {
    console.error(error.message);
  }
}

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
