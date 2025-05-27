import { createClient } from '@/utils/supabase/server';
import { Article, ArticleView, SentenceView } from '../schema';

export async function fetchArticles(limit: number): Promise<ArticleView[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('articles_view')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchLatestArticleByUid(
  uid: string
): Promise<Article | undefined> {
  const supabase = await createClient();
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

// user 側で使うので display 不要
export async function fetchArticlesByUid(uid: string): Promise<Article[]> {
  const supabase = await createClient();
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

// edit で使うので display 不要
export async function fetchArticleById(
  id: number
): Promise<ArticleView | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('articles_view')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('id', id);
  if (error) {
    console.error(error.message);
    return;
  }

  const _article = data[0];

  return {
    ..._article,
    created_at: new Date(_article.created_at!),
  };
}

export async function fetchArticlesByIds(
  ids: number[]
): Promise<ArticleView[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('articles_view')
    .select()
    .order('created_at', { ascending: false })
    .in('id', ids);
  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchSentencesByArticleId(
  articleId: number
): Promise<SentenceView[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sentences_view')
    .select()
    .order('line')
    .eq('articleId', articleId);
  if (error) {
    console.error(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchSentencesByArticleIds(articleIds: number[]) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sentences_view')
    .select()
    .order('line')
    .in('articleId', articleIds);
  if (error) {
    console.error(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchSentencesByArticleId_Uid(
  articleId: number,
  uid: string
): Promise<SentenceView[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('sentences_view')
    .select()
    .eq('articleId', articleId)
    .eq('uid', uid)
    .order('line');
  if (error) {
    console.error(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}
