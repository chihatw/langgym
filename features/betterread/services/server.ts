import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { BetterReadView } from '../schema';

export async function fetchBetterreadByUid(
  uid: string
): Promise<BetterReadView | undefined> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_view')
    .select()
    .eq('uid', uid)
    .limit(1)
    .single();

  if (error) {
    console.log(error.message);
    return;
  }

  if (!data) {
    return;
  }

  return data;
}

export async function fetchBetterreadsById(
  id: number
): Promise<BetterReadView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_view')
    .select()
    .eq('id', id)
    .order('line');

  if (error) {
    console.log(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data;
}
