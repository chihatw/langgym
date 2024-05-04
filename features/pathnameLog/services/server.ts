import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { PathnameLogView } from '../schema';

export async function fetchPathnameLogs(): Promise<PathnameLogView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase.from('pathname_logs_view').select();

  if (error) {
    console.error(error.message);
    return [];
  }
  if (!data) return [];

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
    removed_at: item.removed_at ? new Date(item.removed_at) : null,
  }));
}
