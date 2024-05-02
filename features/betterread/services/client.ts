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

export async function deleteBetterreadImagePath(
  betterreadId: number,
  index: number
) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase
    .from('betterread_image_paths')
    .delete()
    .eq('betterreadId', betterreadId)
    .eq('index', index);

  if (error) {
    console.error(error.message);
  }
}

export async function uploadImageFile(file: Blob, path: string) {
  const supabase = createSupabaseClientComponentClient();

  // 既存のファイルを削除
  // const { error: error_d } = await supabase.storage
  //   .from('image')
  //   .remove([path]);
  // if (error_d) {
  //   return error_d.message;
  // }

  const { error } = await supabase.storage
    .from('image')
    .upload(path, file, { upsert: true });
  if (error) {
    return error.message;
  }
}

export async function getImageUrl(path: string): Promise<string> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase.storage
    .from('image')
    .createSignedUrl(path, 60);
  if (error) {
    console.error(error.message);
    return '';
  }

  return data?.signedUrl;
}

export async function deleteImageFile(path: string) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.storage.from('image').remove([path]);
  if (error) {
    return error.message;
  }
}
