'use client';
import { Sentence } from '@/features/article/schema';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { FULL_SPACE } from '@/features/pitchLine/constants';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';
import { QuizEditFormProps } from './QuizEditForm';

type Props = {
  index: number;
  sentence: Sentence;
  lockedIndexes: number[];
  setValue: Dispatch<SetStateAction<QuizEditFormProps>>;
};

const QuizEditFormSentenceRow = ({
  index,
  sentence,
  lockedIndexes,
  setValue,
}: Props) => {
  const handleClick = (i: number) => {
    setValue((prev) => {
      const lockedIndexes = { ...prev.lockedIndexes };
      let target = [...lockedIndexes[index]];

      if (target.includes(i)) {
        target = target.filter((item) => item !== i);
      } else {
        target.push(i);
      }
      lockedIndexes[index] = target;

      return { ...prev, lockedIndexes };
    });
  };

  if (!lockedIndexes) return <></>;

  return (
    <div className='p-2 rounded bg-white/60 space-y-1'>
      <div className='text-xs'>{index + 1}</div>
      <div className='text-xs text-slate-500'>{sentence.japanese}</div>
      <div className='flex flex-wrap gap-1'>
        {sentence.pitchStr.split(FULL_SPACE).map((word, i) => (
          <div
            key={i}
            className={cn(
              'border rounded p-2 hover:cursor-pointer hover:bg-black/5',
              lockedIndexes.includes(i) && 'border-red-500'
            )}
            onClick={() => handleClick(i)}
          >
            <SentencePitchLine pitchStr={word} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizEditFormSentenceRow;
