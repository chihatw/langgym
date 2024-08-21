import { createSupabaseClientComponentClient } from '@/lib/supabase';
import {
  BetterReadImagePath,
  BetterReadItem,
  BetterReadItemQuestion,
  BetterReadView,
} from '../schema';

export async function insertBetterreadImagePath(
  imagePath: Omit<BetterReadImagePath, 'id' | 'created_at'>
) {
  const supabase = createSupabaseClientComponentClient();

  // 既存のファイルを削除
  const { error: error_d } = await supabase
    .from('betterread_image_paths')
    .delete()
    .eq('betterreadId', imagePath.betterreadId)
    .eq('index', imagePath.index);

  if (error_d) {
    console.error(error_d.message);
  }

  // 追加
  const { error } = await supabase
    .from('betterread_image_paths')
    .insert(imagePath);

  if (error) {
    console.error(error.message);
  }
}

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

export async function fetchBetterread(
  articleId: number
): Promise<BetterReadView | undefined> {
  const supabase = createSupabaseClientComponentClient();

  const { data, error } = await supabase
    .from('betterread_view')
    .select()
    .eq('articleId', articleId)
    .limit(1)
    .single();

  if (error) {
    console.error(error);
    return;
  }
  if (!data) return;
  return data;
}

export async function fetchBetterreadItems(
  betterread_id: number
): Promise<BetterReadItem[]> {
  const supabase = createSupabaseClientComponentClient();

  const { data, error } = await supabase
    .from('betterread_items')
    .select()
    .eq('betterread_id', betterread_id)
    .order('created_at');

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) return [];

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));
}

export async function fetchBetterreadItemQuestions(
  betterread_item_ids: number[]
): Promise<BetterReadItemQuestion[]> {
  const supabase = createSupabaseClientComponentClient();

  const { data, error } = await supabase
    .from('betterread_item_questions')
    .select()
    .in('betterread_item_id', betterread_item_ids)
    .order('created_at');

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) return [];

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));
}
