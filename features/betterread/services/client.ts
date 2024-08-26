import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { BetterReadItem } from '../schema';

export async function insertBetterreadItem(
  betterreadItem: Omit<BetterReadItem, 'id' | 'created_at'>
) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('betterread_items')
    .insert(betterreadItem);

  if (error) {
    console.error(error.message);
  }
}
