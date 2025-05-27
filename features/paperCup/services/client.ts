import { createClient } from '@/utils/supabase/client';
import { PaperCupParams } from '../schema';

export async function fetchPaperCupParams(): Promise<
  PaperCupParams | undefined
> {
  const supabase = createClient();

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

export async function updatePaperCupParams(
  id: number,
  params: string,
  cue: string
) {
  const supabase = createClient();

  const { error } = await supabase
    .from('paper_cup_params')
    .update({ params, cue })
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }
}
