import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { HomepageInfo } from '../schema';

export async function fetchHomepageInfosByUid(
  uid: string
): Promise<HomepageInfo[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('homepage_infos')
    .select()
    .eq('uid', uid)
    .order('created_at');

  if (error) {
    console.log(error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}
