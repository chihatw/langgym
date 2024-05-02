import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { PageStateView } from '../schema';

export async function fetchPageStateByUid(
  uid: string
): Promise<PageStateView | undefined> {
  const supabase = createSupabaseClientComponentClient();
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

export async function updatePageState(uid: string, pageState: string) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('page_states')
    .update({ pageState })
    .eq('uid', uid);

  if (error) {
    console.error(error);
  }
}

export async function updatePageStateIsOpen(uid: string, isOpen: boolean) {
  const supabase = await createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('page_states')
    .update({ isOpen })
    .eq('uid', uid);

  if (error) {
    console.error(error);
  }
}
