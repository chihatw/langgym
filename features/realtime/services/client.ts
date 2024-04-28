import { createSupabaseClientComponentClient } from '@/lib/supabase';

export async function updateOpenIsOpen(uid: string, isOpen: boolean) {
  const supabase = await createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('opens')
    .update({ isOpen })
    .eq('uid', uid);

  if (error) {
    console.error(error);
  }
}
