'use server';
import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';

export async function revalidateBetterread(betterreadId: number) {
  revalidatePath('/');
  revalidatePath(`/betterread/${betterreadId}`);
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
  }
  revalidatePath('/');
  revalidatePath(`/betterread/${betterreadId}`);
}
