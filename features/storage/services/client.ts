import { createClient } from '@/utils/supabase/client';

export async function downloadAudioFile(path: string) {
  const supabase = createClient();
  const { data, error } = await supabase.storage.from('audio').download(path);
  if (error) {
    console.error(error.message);
  }

  return data;
}

export async function uploadAudioFile(file: Blob, path: string) {
  const supabase = createClient();

  const { error } = await supabase.storage
    .from('audio')
    .upload(path, file, { upsert: true });
  if (error) {
    return error.message;
  }
}

export async function uploadImageFile(file: Blob, path: string) {
  const supabase = createClient();

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

export async function uploadPostItItemImage(file: Blob, path: string) {
  const supabase = createClient();

  const { error } = await supabase.storage
    .from('postits')
    .upload(path, file, { upsert: true });
  if (error) {
    console.error(error.message);
    return '';
  }

  // url 取得
  const { data } = await supabase.storage.from('postits').getPublicUrl(path);
  const imageUrl = data.publicUrl;
  return imageUrl;
}

export async function uploadPostItNoteFile(file: Blob, path: string) {
  const supabase = createClient();

  const { error } = await supabase.storage
    .from('postit-notes')
    .upload(path, file, { upsert: true });
  if (error) {
    console.error(error.message);
    return '';
  }

  // url 取得
  const { data } = await supabase.storage
    .from('postit-notes')
    .getPublicUrl(path);
  const imageUrl = data.publicUrl;
  return imageUrl;
}

export async function deleteAudioFile(path: string) {
  const supabase = createClient();
  const { error } = await supabase.storage.from('audio').remove([path]);
  if (error) {
    return error.message;
  }
}

export async function deleteAudioFiles(paths: string[]) {
  const supabase = createClient();
  const { error } = await supabase.storage.from('audio').remove(paths);
  if (error) {
    console.error(error.message);
  }
}

export async function deleteImageFile(path: string) {
  const supabase = createClient();
  const { error } = await supabase.storage.from('image').remove([path]);
  if (error) {
    return error.message;
  }
}

export async function deletePostItItemImage(path: string) {
  const supabase = createClient();
  const { error } = await supabase.storage.from('postits').remove([path]);
  if (error) {
    return error.message;
  }
}

export async function deletePostItNoteFile(path: string) {
  const supabase = createClient();
  const { error } = await supabase.storage.from('postit-notes').remove([path]);
  if (error) {
    return error.message;
  }
}
