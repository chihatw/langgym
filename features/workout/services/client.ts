import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { WorkoutItemView } from '../schema';

export async function fetchWorkoutItems(): Promise<WorkoutItemView[]> {
  const supabase = createSupabaseClientComponentClient();
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
