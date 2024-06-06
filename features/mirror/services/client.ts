import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { MirrorWorkoutRealtime } from '../schema';

export async function updateMirrorWorkoutRealtime({
  id,
  isMirror,
  selectedId,
}: MirrorWorkoutRealtime) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('mirror_workout_realtime')
    .update({ isMirror, selectedId })
    .eq('id', id);
  if (error) {
    console.error(error.message);
  }
}
