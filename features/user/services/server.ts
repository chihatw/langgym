import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { AppUser } from '../schema';

export async function fetchUsers() {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase.from('users').select();
  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) return [];

  const users: AppUser[] = data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
    updated_at: new Date(item.updated_at),
  }));

  return users;
}

export async function fetchUserByUid(
  uid: string
): Promise<AppUser | undefined> {
  const supabase = createSupabaseServerComponentClient();
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
    updated_at: new Date(data.updated_at),
  };
}
