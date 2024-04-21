import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import {
  Article,
  ArticleMark,
  ArticleRecordedAssignment,
  SentenceView,
} from '../schema';

export async function fetchArticles(limit: number): Promise<Article[]> {
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
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));
}

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
  } as Article;
}

// export async function fetchArticleById_Uid(
//   id: number,
//   uid: string
// ): Promise<Article | undefined> {
//   const supabase = createSupabaseServerComponentClient();
//   const { data, error } = await supabase
//     .from('articles')
//     .select('*')
//     .order('created_at', { ascending: false })
//     .eq('id', id)
//     .eq('uid', uid);
//   if (error) {
//     console.log(error.message);
//     return;
//   }

//   const _article = data[0];

//   return {
//     ..._article,
//     created_at: new Date(_article.created_at),
//   } as Article;
// }

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

export async function fetchArticleMarks(
  articleId: number
): Promise<ArticleMark[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('article_marks')
    .select('*')
    .order('line')
    .eq('articleId', articleId);

  if (error) {
    console.log(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));
}

export async function fetchArticleRecordedAssignments(
  articleId: number
): Promise<ArticleRecordedAssignment[]> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('article_recorded_assignments')
    .select('*')
    .order('line')
    .eq('articleId', articleId);

  if (error) {
    console.log(error.message);
    return [];
  }
  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));
}
