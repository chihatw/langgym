'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { AppUser } from '../schema';

export async function updateUser({ uid, realtime, realtimePage }: AppUser) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('users')
    .update({
      realtime,
      realtimePage,
    })
    .eq('uid', uid);

  if (error) {
    console.error(error);
    return;
  }
  revalidatePath('/realtime');
}
