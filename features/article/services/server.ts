import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';

export async function fetchArticles(limit: number) {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.log(error.message);
    return [];
  }
  return data;
}

export async function fetchArticlesByUid(uid: string) {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('uid', uid);
  if (error) {
    console.log(error.message);
    return [];
  }
  return data;
}

export async function fetchArticleById(id: string) {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('id', id);
  if (error) {
    console.log(error.message);
    return;
  }
  return data[0];
}
