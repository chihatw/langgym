import { createClient } from '@/utils/supabase/server';
import { RedirectToView } from '../schema';

export async function fetchRedirectTos(): Promise<RedirectToView[]> {
  const supabase = await createClient();
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
