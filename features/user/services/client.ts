import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { AppUser } from '../schema';

export async function fetchUserByUid(
  uid: string
): Promise<AppUser | undefined> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('uid', uid)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  return {
    ...data,
    created_at: new Date(data.created_at),
  };
}
