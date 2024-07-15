import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { BetterReadImagePath, BetterReadImagePathView } from '../schema';

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

export async function fetchBetterreadImagePathsByArticleId(
  articleId: number
): Promise<BetterReadImagePathView[]> {
  const supabase = createSupabaseClientComponentClient();

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

// debug
export async function fetchBetterreadImagePathByUid_client(
  uid: string
): Promise<BetterReadImagePathView | undefined> {
  const supabase = createSupabaseClientComponentClient();

  // debug
  console.log(uid);

  const { data: data_0 } = await supabase.from('betterread').select();
  console.log(data_0?.length);

  const { data: data_1 } = await supabase
    .from('betterread_image_paths_view')
    .select();
  console.log(data_1?.length);

  const { data: data_2 } = await supabase
    .from('betterread_image_paths_view')
    .select()
    .eq('uid', uid);
  console.log(data_2?.length);

  const { data: data_3 } = await supabase
    .from('betterread_image_paths_view')
    .select()
    .eq('uid', uid)
    .limit(1);
  console.log(data_3?.length);

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
