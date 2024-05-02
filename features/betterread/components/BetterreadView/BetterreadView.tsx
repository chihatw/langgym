'use client';
import { fetchLatestArticleByUid } from '@/features/article/services/client';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { BetterReadImagePathView } from '../../schema';
import { fetchBetterreadImagePathsByArticleId } from '../../services/client';
import ImageContainer from './ImageContainer';

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
    <div className='flex justify-center mt-6 '>
      <div className='grid gap-8 pt-10'>
        {value.betterreadImagePaths.map((line, index) => (
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
