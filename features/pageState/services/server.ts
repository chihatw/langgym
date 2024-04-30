import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { PageStateView } from '../schema';

export async function fetchPageStates(): Promise<PageStateView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase.from('page_states_view').select();

  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}

export async function fetchPageStateByUid(
  uid: string
): Promise<PageStateView | undefined> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('page_states_view')
    .select()
    .eq('uid', uid)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  return data;
}
