// hooks/useImageUrl.ts
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';

export const useImageUrl = (bucket: string, path: string) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);

      setImageUrl(data.publicUrl);
    };
    fetchImageUrl();
  }, [bucket, path]);

  return { imageUrl };
};
