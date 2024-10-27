import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { RedirectToView } from '../schema';

export async function fetchRedirectTos(): Promise<RedirectToView[]> {
  const supabase = await createSupabaseServerComponentClient();
  const { data, error } = await supabase.from('redirect_tos_view').select();
  if (error) {
    console.error(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    updated_at: new Date(item.updated_at!),
  }));
}
