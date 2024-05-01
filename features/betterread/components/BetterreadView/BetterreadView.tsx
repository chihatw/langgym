'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BetterReadImagePathView } from '../../schema';
import { getImageUrl } from '../../services/client';

type Props = {
  betterreadImagePaths: BetterReadImagePathView[];
};

const BetterreadView = ({ betterreadImagePaths }: Props) => {
  return (
    <div className='flex justify-center mt-6 '>
      <div className='grid gap-8 pt-10'>
        {betterreadImagePaths.map((line, index) => (
          <div className='flex gap-4' key={index}>
            <div className='basis-2 text-right text-xs'>{line.index! + 1}</div>
            <div className='flex-1 space-y-2'>
              <div className='text-sm font-extrabold'>{line.japanese}</div>
              <div className='text-xs text-green-600'>{line.chinese}</div>
              {/* 0行目 は表示しない */}
              {!!line.index && line.imagePath ? (
                <ImageContainer imagePath={line.imagePath} />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetterreadView;

type FormProps = {
  imageSrc: string;
};

const INITIAL_STATE: FormProps = {
  imageSrc: '',
};

const ImageContainer = ({ imagePath }: { imagePath: string }) => {
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
