import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';

export async function getUserFromServerSide() {
  const supabase = createSupabaseServerComponentClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user || undefined;
}
