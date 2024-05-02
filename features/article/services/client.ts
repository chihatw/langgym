import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { Article } from '../schema';

export async function fetchLatestArticleByUid(
  uid: string
): Promise<Article | undefined> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase
    .from('articles')
    .select()
    .order('created_at', { ascending: false })
    .eq('uid', uid)
    .limit(1)
    .single();
  if (error) {
    console.error(error.message);
    return;
  }

  if (!data) return;

  return {
    ...data,
    created_at: new Date(data.created_at),
  };
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

export async function downloadAudioFile(path: string) {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase.storage.from('audio').download(path);
  if (error) {
    console.error(error.message);
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
