import { createSupabaseClientComponentClient } from '@/lib/supabase';

export async function updateRemoteLoginTrigger() {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase.rpc('update_remote_login_trigger');
  if (error) {
    console.error(error);
    return;
  }
  return;
}
