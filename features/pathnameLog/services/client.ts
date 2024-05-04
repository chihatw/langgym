import { createSupabaseClientComponentClient } from '@/lib/supabase';

export async function insertPathnameLog(uid: string | null, pathname: string) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('pathname_logs')
    .insert({ uid: uid || 'anon', pathname });

  if (error) {
    console.error(error.message);
  }
}

export async function updatePathnameLog(
  _uid: string | null,
  _pathname: string
) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase.rpc('update_pathname_log', {
    _pathname,
    _uid: _uid || 'anon',
  });
  if (error) console.error(error);
}
