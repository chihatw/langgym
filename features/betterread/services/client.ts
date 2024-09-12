import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { BetterReadItem, BetterReadItemView } from '../schema';

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

export async function fetchBetterreadItemsByBetterreadId(
  betterread_id: number
): Promise<BetterReadItemView[]> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase
    .from('betterread_items_view')
    .select()
    .eq('betterread_id', betterread_id)
    .order('item_created_at')
    .order('question_created_at');

  if (error) {
    console.error(error.message);
    return [];
  }

  return data.map((item) => ({
    ...item,
    item_created_at: new Date(item.item_created_at!),
    question_created_at: new Date(item.question_created_at!),
  }));
}
