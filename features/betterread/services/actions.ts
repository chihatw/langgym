'use server';
import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { BetterReadItemQuestion } from '../schema';

export async function revalidateBetterread(betterreadId: number) {
  revalidatePath('/');
  revalidatePath(`/betterread/${betterreadId}`);
  revalidatePath('/mng/betterread/list');
  revalidatePath(`/mng/betterread/${betterreadId}`);
}

export async function insertBetterread(uid: string, articleId: number) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('betterread')
    .insert({ uid, articleId });

  if (error) {
    return error.message;
  }
  revalidatePath('/');
  revalidatePath('/mng/betterread/list');
  return '';
}

export async function insertBetterreadItemQuestion(
  question: Omit<BetterReadItemQuestion, 'id' | 'created_at'>,
  betterreadId: number
) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('betterread_item_questions')
    .insert(question);

  if (error) {
    return error.message;
  }

  revalidateBetterread(betterreadId);
}

export async function deleteBetterread(id: number) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase.from('betterread').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }
  revalidatePath('/');
  revalidatePath('/mng/betterread/list');
}

export async function deleteBetterreadItem(id: number, betterreadId: number) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('betterread_items')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }
  revalidateBetterread(betterreadId);
}

export async function deleteBetterreadItemQuestion(
  id: number,
  betterreadId: number
) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('betterread_item_questions')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }
  revalidateBetterread(betterreadId);
}

export async function deleteBetterreadImagePath(
  betterreadId: number,
  index: number
) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('betterread_image_paths')
    .delete()
    .eq('betterreadId', betterreadId)
    .eq('index', index);

  if (error) {
    console.error(error.message);
    return;
  }
  revalidateBetterread(betterreadId);
}
