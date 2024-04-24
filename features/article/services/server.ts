import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { Article, ArticleView, SentenceView } from '../schema';

export async function fetchArticles(limit: number): Promise<ArticleView[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('articles_view')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.log(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

// user 側で使うので display 不要
export async function fetchArticlesByUid(uid: string): Promise<Article[]> {
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
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));
}

// edit で使うので display 不要
export async function fetchArticleById(
  id: number
): Promise<Article | undefined> {
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
    created_at: new Date(_article.created_at),
  };
}

export async function fetchSentencesByArticleId(
  articleId: number
): Promise<SentenceView[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('sentences_view')
    .select()
    .order('line')
    .eq('articleId', articleId);
  if (error) {
    console.log(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}
