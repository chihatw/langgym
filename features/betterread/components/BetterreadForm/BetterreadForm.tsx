'use client';

import { SentenceView } from '@/features/article/schema';
import { cn } from '@/lib/utils';
import { Lato } from 'next/font/google';
import { BetterReadItem, BetterReadItemQuestion } from '../../schema';
import BetterreadFormRow from './BetterreadFormRow';
import BetterreadFormSentence from './BetterreadFormSentence';
import UploadBetterreadImage from './UploadBetterreadImage';

const lato = Lato({ subsets: ['latin'], weight: '900' });

type Props = {
  sentences: SentenceView[];
  betterreadId: number;
  betterreadItems: BetterReadItem[];
  betterreadItemQuestions: BetterReadItemQuestion[];
};

const BetterreadForm = ({
  sentences,
  betterreadId,
  betterreadItems,
  betterreadItemQuestions,
}: Props) => {
  return (
    <div className='grid gap-4'>
      <div className='text-2xl font-extrabold'>課前準備</div>
      <div className='flex items-center justify-center'>
        <div>
          <span
            className={cn(
              'font-lato text-[90px] font-[900] ',
              betterreadItemQuestions.length > 7
                ? 'text-gray-700'
                : 'text-red-500'
            )}
          >
            {betterreadItemQuestions.length}
          </span>
          <span className='font-lato text-[48px] font-[900] text-gray-700'>{`/${8}`}</span>
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
        showForm={betterreadItems.length < 2}
      />
      {betterreadItems.length > 1 ? (
        <div className='text-xs text-gray-400 text-center py-4'>
          <div>已經上傳兩張照片</div>
        </div>
      ) : null}
    </div>
  );
};

export default BetterreadForm;
