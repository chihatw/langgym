import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { FULL_SPACE } from '@/features/pitchLine/constants';
import { cn } from '@/lib/utils';
import { ArticlePitchQuizAnswerRowView } from '../../schema';

type Props = {
  row: ArticlePitchQuizAnswerRowView;
};

const WrongAnswer = ({ row }: Props) => {
  const answerWordPitches = row.answer!.split(FULL_SPACE);
  const correctWordPitches = row.pitchStr!.split(FULL_SPACE);
  return (
    <div className='grid gap-2 ml-10'>
      <div className='flex flex-wrap gap-1'>
        {answerWordPitches.map((pitchStr, index) => {
          const isWrong = correctWordPitches[index] !== pitchStr;
          const isLocked = row.lockedIndexes!.includes(index);
          return (
            <div
              key={index}
              className={cn(
                'rounded p-1',
                isWrong && 'bg-pink-200 bg-opacity-40',
                isLocked && 'bg-slate-200'
              )}
            >
              <SentencePitchLine pitchStr={pitchStr} />
            </div>
          );
        })}
      </div>
      <div className='text-xs text-[#52a2aa]'>正解:</div>
      <div className='ml-[1em] grid gap-1'>
        {correctWordPitches
          .filter((item, index) => item !== answerWordPitches[index])
          .map((item, index) => (
            <div key={index}>
              <SentencePitchLine pitchStr={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default WrongAnswer;
