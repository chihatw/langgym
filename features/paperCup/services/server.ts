import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { PaperCupParams } from '../schema';

export async function fetchPaperCupParams(): Promise<
  PaperCupParams | undefined
> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('paper_cup_params')
    .select()
    .limit(1)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  if (!data) return;

  return { ...data, created_at: new Date(data.created_at) };
}
