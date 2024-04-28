import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { Open } from '../schema';

export async function fetchOpens(): Promise<Open[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase.from('opens').select();

  if (error) {
    console.error(error.message);
    return [];
  }
  return data;
}

export async function fetchOpenByUid(uid: string) {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('opens')
    .select()
    .eq('uid', uid)
    .single();

  if (error) {
    console.error(error.message);
    return false;
  }
  return data.isOpen;
}
