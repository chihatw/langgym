import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { Article, Sentence } from '../schema';

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

export async function fetchArticleById(id: number) {
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

  const _article = data[0];

  return {
    ..._article,
    created_at: new Date(_article.date),
  } as Article;
}

export async function fetchSentencesByArticleId(articleId: number) {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('sentences')
    .select('*')
    .order('line')
    .eq('articleId', articleId);
  if (error) {
    console.log(error.message);
    return;
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  })) as Sentence[];
}
