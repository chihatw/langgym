'use client';
import { getImageUrl } from '@/features/storage/services/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  imagePath: string;
};

type FormProps = {
  imageSrc: string;
};

const INITIAL_STATE: FormProps = {
  imageSrc: '',
};

const ImageContainer = ({ imagePath }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!imagePath) {
      setValue((prev) => ({ ...prev, imageSrc: '' }));
      return;
    }

    (async () => {
      const url = await getImageUrl(imagePath);
      setValue((prev) => ({
        ...prev,
        imageSrc: url,
      }));
    })();
  }, [imagePath]);

  if (!value.imageSrc) return null;

  return (
    <div className='grid gap-2 rounded-lg bg-white bg-opacity-60 p-3'>
      <Image
        src={value.imageSrc}
        alt=''
        className='rounded-lg'
        width={512}
        height={512}
        sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
      />
    </div>
  );
};

export default ImageContainer;
