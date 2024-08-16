'use server';
import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';

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
