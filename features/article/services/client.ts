import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { Article } from '../schema';

export async function fetchArticlesByUid(uid: string): Promise<Article[]> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('uid', uid)
    .eq('isArchived', false);
  if (error) {
    console.error(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));
}

export async function fetchLatestArticleByUid(
  uid: string
): Promise<Article | undefined> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase
    .from('articles')
    .select()
    .order('created_at', { ascending: false })
    .eq('uid', uid)
    .limit(1)
    .single();
  if (error) {
    console.error(error.message);
    return;
  }

  if (!data) return;

  return {
    ...data,
    created_at: new Date(data.created_at),
  };
}
