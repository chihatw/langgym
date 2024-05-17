import { createSupabaseClientComponentClient } from '@/lib/supabase';

export async function downloadAudioFile(path: string) {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase.storage.from('audio').download(path);
  if (error) {
    console.error(error.message);
  }

  return data;
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
export async function uploadAudioFile(file: Blob, path: string) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase.storage
    .from('audio')
    .upload(path, file, { upsert: true });
  if (error) {
    return error.message;
  }
}

export async function uploadImageFile(file: Blob, path: string) {
  const supabase = createSupabaseClientComponentClient();

  const { error } = await supabase.storage
    .from('image')
    .upload(path, file, { upsert: true });
  if (error) {
    console.error(error.message);
    return '';
  }

  // url 取得
  const { data } = await supabase.storage.from('image').getPublicUrl(path);
  const imageUrl = data.publicUrl;
  return imageUrl;
}

export async function deleteAudioFile(path: string) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.storage.from('audio').remove([path]);
  if (error) {
    return error.message;
  }
}

export async function deleteAudioFiles(paths: string[]) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.storage.from('audio').remove(paths);
  if (error) {
    console.error(error.message);
  }
}

export async function deleteImageFile(path: string) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.storage.from('image').remove([path]);
  if (error) {
    return error.message;
  }
}
