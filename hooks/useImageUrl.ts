import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export const useImageUrl = (bucket: string, path: string) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      const supabase = createClient();
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);

      setImageUrl(data.publicUrl);
    };
    fetchImageUrl();
  }, [bucket, path]);

  return { imageUrl };
};
