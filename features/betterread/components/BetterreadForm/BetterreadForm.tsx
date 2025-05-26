'use client';

import { SentenceView } from '@/features/article/schema';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import {
  BETTERREAD_MAX_COUNT,
  BETTERREAD_PHOTO_MAX_COUNT,
} from '../../constants';
import { BetterReadItemView } from '../../schema';
import BetterreadFormRow from './BetterreadFormRow';
import BetterreadFormSentence from './BetterreadFormSentence';
import UploadBetterreadImage from './UploadBetterreadImage';

type Props = {
  sentences: SentenceView[];
  betterreadId: number;
  betterreadItems: BetterReadItemView[];
};

const dummyIds = [29, 30];

const BetterreadForm = ({
  sentences,
  betterreadId,
  betterreadItems,
}: Props) => {
  const maxCount = dummyIds.includes(betterreadId) ? 4 : BETTERREAD_MAX_COUNT;
  const photoMaxCount = dummyIds.includes(betterreadId)
    ? 1
    : BETTERREAD_PHOTO_MAX_COUNT;

  const uniqBetterreadItemIds = useMemo(() => {
    return Array.from(new Set(betterreadItems.map((item) => item.id!)));
  }, [betterreadItems]);

  return (
    <div className='grid gap-4'>
      <div className='text-2xl font-extrabold'>課前準備</div>
      <div className='flex items-center justify-center'>
        <div>
          <span
            className={cn(
              'font-lato text-[90px] font-black ',
              betterreadItems.length >= maxCount
                ? 'text-gray-700'
                : 'text-red-500'
            )}
          >
            {betterreadItems.length}
          </span>
          <span className='font-lato text-[48px] font-black text-gray-700'>{`/${maxCount}`}</span>
        </div>
      </div>
      <div className='grid gap-1'>
        {sentences.map((sentence, index) => (
          <BetterreadFormSentence
            key={index}
            japanese={sentence.japanese || ''}
            chinese={sentence.chinese || ''}
          />
        ))}
      </div>
      <div className='text-gray-500 text-center text-3xl font-extrabold'>
        照片裡嚴禁使用“文字”
      </div>
      {uniqBetterreadItemIds.map((betterreadItemId, index) => {
        const target = betterreadItems.filter(
          (item) => item.id === betterreadItemId
        );
        return <BetterreadFormRow key={index} betterreadItems={target} />;
      })}
      <UploadBetterreadImage
        betterreadId={betterreadId}
        showForm={betterreadItems.length < photoMaxCount}
      />
      {betterreadItems.length >= photoMaxCount ? (
        <div className='text-xs text-gray-400 text-center py-4'>
          <div>達到上傳上限</div>
        </div>
      ) : null}
    </div>
  );
};

export default BetterreadForm;
