import { createSupabaseClientComponentClient } from '@/lib/supabase';

export async function uploadAudioFile(file: Blob, path: string) {
  const supabase = createSupabaseClientComponentClient();

  // 既存のファイルを削除
  const { error: error_d } = await supabase.storage
    .from('audio')
    .remove([path]);
  if (error_d) {
    return error_d.message;
  }

  const { error } = await supabase.storage.from('audio').upload(path, file);
  if (error) {
    return error.message;
  }
}

export async function downloadAudioFile(path: string) {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase.storage.from('audio').download(path);
  if (error) {
    console.log(error.message);
  }

  return data;
}

export async function deleteAudioFile(path: string) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.storage.from('audio').remove([path]);
  if (error) {
    return error.message;
  }
}
