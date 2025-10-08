import { createClient } from '@/utils/supabase/server';
import { PostItWorkout } from '../schema';

export async function fetchPostItWorkoutByUid(
  uid: string
): Promise<PostItWorkout | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('postit_workouts')
    .select()
    .eq('uid', uid)
    .single();

  if (error) {
    console.log(error.message);
    return;
  }

  return data;
}
