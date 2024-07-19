import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { BetterReadImagePathView } from '../schema';

export async function fetchBetterreads(): Promise<BetterReadImagePathView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_image_paths_view')
    .select();

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchBetterreadImagePathsByArticleId(
  articleId: number
): Promise<BetterReadImagePathView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_image_paths_view')
    .select()
    .eq('articleId', articleId)
    .order('index');

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchBetterreadImagePathByUid(
  uid: string
): Promise<BetterReadImagePathView | undefined> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_image_paths_view')
    .select()
    .eq('uid', uid)
    .limit(1)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  if (!data) {
    return;
  }

  return {
    ...data,
    created_at: new Date(data.created_at!),
  };
}

export async function fetchBetterreadImagePathsById(
  id: number
): Promise<BetterReadImagePathView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_image_paths_view')
    .select()
    .eq('betterreadId', id)
    .order('index');

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}
