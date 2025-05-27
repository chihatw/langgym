import { createClient } from '@/utils/supabase/server';
import { HomepageInfo } from '../schema';

export async function fetchHomepageInfosByUid(
  uid: string
): Promise<HomepageInfo[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('homepage_infos')
    .select()
    .eq('uid', uid)
    .order('created_at');

  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}
