'use client';

import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {};

const imagePath = 'folder/sample.png';

const ImagePage = (props: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      // file Path から url を取得
      const { data } = supabase.storage.from('image').getPublicUrl(imagePath);
      setImageUrl(data.publicUrl);
    };
    fetchImageUrl();
  }, []);

  if (!imageUrl) return <div>Loading...</div>;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        // url を設定
        src={imageUrl}
        alt='Supabase image'
        fill
        style={{
          objectFit: 'contain', // アスペクト比維持して画面いっぱい表示
        }}
        sizes='100vw'
        priority
      />
    </div>
  );
};

export default ImagePage;
