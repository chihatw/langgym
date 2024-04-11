'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { Article } from '../schema';

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

export async function batchInsertSentences() {
  // todo
}
