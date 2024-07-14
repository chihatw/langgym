'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';

export async function updateRedirectTo(id: number, redirect_to: string) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('redirect_tos')
    .update({ updated_at: new Date().toISOString(), redirect_to })
    .eq('id', id);
  if (error) {
    console.error(error.message);
    return;
  }

  revalidatePath('/');
}
