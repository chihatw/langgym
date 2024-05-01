import { createSupabaseClientComponentClient } from '@/lib/supabase';

export async function updatePaperCupParams(
  id: number,
  params: string,
  cue: string
) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('paper_cup_params')
    .update({ params, cue })
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }
}
