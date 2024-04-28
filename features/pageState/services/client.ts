import { createSupabaseClientComponentClient } from '@/lib/supabase';

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
