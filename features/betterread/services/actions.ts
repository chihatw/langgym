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
): Promise<{ errMsg: string; question?: BetterReadItemQuestion }> {
  const supabase = createSupabaseServerActionClient();
  const { data, error } = await supabase
    .from('betterread_item_questions')
    .insert(question)
    .select()
    .single();

  if (error) {
    return { errMsg: error.message };
  }

  revalidateBetterread(betterreadId);
  return {
    errMsg: '',
    question: {
      ...data,
      created_at: new Date(data.created_at),
    },
  };
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

export async function updateBetterreadItemQuestion(
  id: number,
  view_point: string,
  question: string,
  betterreadId: number
) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('betterread_item_questions')
    .update({ view_point, question })
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

export async function updateBetterreadToggleBetterreadId(
  betterread_id: number
) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('betterread_toggle')
    .update({ betterread_id })
    .eq('id', 1);

  if (error) {
    console.error(error.message);
  }
  revalidatePath('/mng/realtime');
}

export async function updateBetterreadToggleViewPoints(view_points: number[]) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('betterread_toggle')
    .update({ view_points })
    .eq('id', 1);

  if (error) {
    console.error(error.message);
  }
  revalidatePath('/mng/realtime');
}

export async function updateBetterreadToggleQuestions(questions: number[]) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('betterread_toggle')
    .update({ questions })
    .eq('id', 1);

  if (error) {
    console.error(error.message);
  }
  revalidatePath('/mng/realtime');
}
