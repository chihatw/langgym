import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { AppUser } from '../schema';

export async function fetchUsers() {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase.from('users').select('*');
  if (!data) {
    console.log(error.message);
    return [];
  }

  const users: AppUser[] = data.map((item) => ({
    id: item.id,
    uid: item.uid,
    display: item.display,
    created_at: new Date(item.created_at).getTime(),
  }));

  return users;
}
