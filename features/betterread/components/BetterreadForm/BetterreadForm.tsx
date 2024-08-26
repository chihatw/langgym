'use client';

import { SentenceView } from '@/features/article/schema';
import { cn } from '@/lib/utils';
import {
  BETTERREAD_MAX_COUNT,
  BETTERREAD_PHOTO_MAX_COUNT,
} from '../../constants';
import { BetterReadItem, BetterReadItemQuestion } from '../../schema';
import BetterreadFormRow from './BetterreadFormRow';
import BetterreadFormSentence from './BetterreadFormSentence';
import UploadBetterreadImage from './UploadBetterreadImage';

type Props = {
  sentences: SentenceView[];
  betterreadId: number;
  betterreadItems: BetterReadItem[];
  betterreadItemQuestions: BetterReadItemQuestion[];
};

const dummyIds = [29, 30];

const BetterreadForm = ({
  sentences,
  betterreadId,
  betterreadItems,
  betterreadItemQuestions,
}: Props) => {
  const maxCount = dummyIds.includes(betterreadId) ? 4 : BETTERREAD_MAX_COUNT;
  const photoMaxCount = dummyIds.includes(betterreadId)
    ? 1
    : BETTERREAD_PHOTO_MAX_COUNT;
  return (
    <div className='grid gap-4'>
      <div className='text-2xl font-extrabold'>課前準備</div>
      <div className='flex items-center justify-center'>
        <div>
          <span
            className={cn(
              'font-lato text-[90px] font-[900] ',
              betterreadItemQuestions.length >= maxCount
                ? 'text-gray-700'
                : 'text-red-500'
            )}
          >
            {betterreadItemQuestions.length}
          </span>
          <span className='font-lato text-[48px] font-[900] text-gray-700'>{`/${maxCount}`}</span>
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
      {betterreadItems.map((betterreadItem, index) => (
        <BetterreadFormRow
          key={index}
          betterreadItem={betterreadItem}
          betterreadItemQuestions={betterreadItemQuestions.filter(
            (q) => q.betterread_item_id === betterreadItem.id
          )}
        />
      ))}
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
