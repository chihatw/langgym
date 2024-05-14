import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { CanvasBox } from '../schema';

export async function fetchCanvas(): Promise<CanvasBox | undefined> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('canvas')
    .select()
    .limit(1)
    .single();
  if (error) {
    console.error(error.message);
    return;
  }
  return data;
}
