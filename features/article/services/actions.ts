'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { Article, ArticleMark, Sentence } from '../schema';

function revalidatePath_article_list() {
  revalidatePath('/');
}

function revalidatePath_article(id: number) {
  revalidatePath('/');
  revalidatePath(`/article/${id}`);
  revalidatePath(`/mng/article/${id}/batchInput`);
  revalidatePath(`/mng/article/${id}/edit`);
  revalidatePath(`/mng/article/${id}/print`);
  revalidatePath(`/mng/article/${id}/upload`);
}

function revalidatePath_article_marks(id: number) {
  revalidatePath(`/article/${id}`);
  revalidatePath(`/mng/article/${id}/upload`);
}

export async function insertArticle(
  article: Omit<Article, 'id' | 'created_at'>
) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase.from('articles').insert(article);
  if (error) {
    return error.message;
  }
  revalidatePath_article_list();
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
  revalidatePath_article(id);
  return;
}

export async function deleteArticle(id: number) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase.from('articles').delete().eq('id', id);
  if (error) {
    console.log(error.message);
    return;
  }
  revalidatePath_article_list();
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

  revalidatePath_article(articleId);
}

export async function updateArticleIsShowAccents(
  id: number,
  isShowAccents: boolean
) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('articles')
    .update({ isShowAccents })
    .eq('id', id);
  if (error) {
    return error.message;
  }
  revalidatePath_article(id);
  return;
}

export async function updateArticleAudioPath(id: number, audioPath: string) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('articles')
    .update({ audioPath })
    .eq('id', id);
  if (error) {
    return error.message;
  }
  revalidatePath_article(id);
}

export async function batchInsertArticleMarks(
  articleId: number,
  marks: Omit<ArticleMark, 'id' | 'created_at'>[]
) {
  const supabase = createSupabaseServerActionClient();

  // 既存の articleMarks を削除
  const { error } = await supabase
    .from('article_marks')
    .delete()
    .eq('articleId', articleId);

  if (error) {
    return error.message;
  }

  // 新規作成
  const { error: _error } = await supabase.from('article_marks').insert(marks);
  if (_error) {
    return _error.message;
  }

  revalidatePath_article_marks(articleId);
}
