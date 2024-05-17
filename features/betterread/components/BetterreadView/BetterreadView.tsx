'use client';
import { fetchLatestArticleByUid } from '@/features/article/services/client';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BetterReadImagePathView } from '../../schema';
import { fetchBetterreadImagePathsByArticleId } from '../../services/client';

type Props = {};

type FormProps = {
  betterreadImagePaths: BetterReadImagePathView[];
};

const INITIAL_STATE: FormProps = {
  betterreadImagePaths: [],
};

const BetterreadView = ({}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // initialize
  useEffect(() => {
    (async () => {
      const supabase = createSupabaseClientComponentClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setValue(INITIAL_STATE);
        return;
      }

      const article = await fetchLatestArticleByUid(user.id);
      if (!article) {
        setValue(INITIAL_STATE);
        return;
      }

      const betterreadImagePaths = await fetchBetterreadImagePathsByArticleId(
        article.id
      );
      setValue((prev) => ({ ...prev, betterreadImagePaths }));
    })();
  }, []);

  return (
    <div className='flex justify-center '>
      <div className='grid gap-8 pt-10 mt-6 max-w-lg'>
        {value.betterreadImagePaths.map((line, index) => (
          <div className='grid grid-cols-[8px,1fr] gap-4' key={index}>
            <div className='text-right text-xs'>{line.index! + 1}</div>
            <div className='grid gap-2'>
              <div className='text-sm font-extrabold'>{line.japanese}</div>
              <div className='text-xs text-green-600'>{line.chinese}</div>
              {/* 0行目 は表示しない */}
              {!!line.index && line.imageUrl ? (
                <ImageContainer imageUrl={line.imageUrl} />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetterreadView;

const ImageContainer = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className='grid gap-2 rounded-lg bg-white bg-opacity-60 p-3'>
      <Image
        src={imageUrl}
        alt=''
        className='rounded-lg'
        width={512}
        height={512}
        sizes='(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw'
      />
    </div>
  );
};
