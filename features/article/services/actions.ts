'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { Article, Sentence } from '../schema';

export async function insertArticle(
  article: Omit<Article, 'id' | 'created_at'>
) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase.from('articles').insert(article);
  if (error) {
    return error.message;
  }
  revalidatePath('/');
  revalidatePath('/mng');
  return;
}

export async function updateArticle(
  id: number,
  item: {
    uid: string;
    date: string;
    title: string;
  }
) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('articles')
    .update({ ...item })
    .eq('id', id);
  if (error) {
    return error.message;
  }
  revalidatePath('/');
  revalidatePath(`/article/${id}`);
  revalidatePath('/mng');
  return;
}

export async function deleteArticle(id: number) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) {
    console.log(error.message);
    return;
  }
  revalidatePath('/');
  revalidatePath('/mng');
  return;
}

export async function batchInsertSentences(
  articleId: number,
  sentences: Omit<Sentence, 'id' | 'created_at'>[]
) {
  const supabase = createSupabaseServerActionClient();

  // 既存の sentenes を削除
  const { error } = await supabase
    .from('sentences')
    .delete()
    .eq('articleId', articleId);

  if (error) {
    return error.message;
  }

  // 新規作成
  const { error: _error } = await supabase.from('sentences').insert(sentences);
  if (_error) {
    return _error.message;
  }

  revalidatePath(`/article/${articleId}`);
  revalidatePath(`/mng/article/${articleId}/batchInput`);
}
