import AudioSlider from '@/components/AudioSlider';
import { ArticleMark } from '@/features/article/schema';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { FULL_SPACE } from '@/features/pitchLine/constants';
import { getAccentIndex } from '@/features/pitchLine/services/utils';
import { ArticlePitchQuestion } from '../../schema';
import QuizFormWord from './QuizFormWord';

type Props = {
  line: number;
  pitchStr: string;
  hasAudio: boolean;
  question: ArticlePitchQuestion;
  audioBuffer?: AudioBuffer;
  articleMark?: ArticleMark;
  handleClick: (wordIndex: number, index: number) => void;
};

const QuizFormSentence = ({
  line,
  hasAudio,
  audioBuffer,
  articleMark,
  pitchStr,
  question,
  handleClick,
}: Props) => {
  return (
    <div className='p-2 rounded bg-white/60 space-y-2'>
      <div className='text-xs font-extrabold'>{line + 1}</div>
      {hasAudio && audioBuffer ? (
        <AudioSlider
          start={articleMark?.start || 0}
          end={articleMark?.end || 0}
          audioBuffer={audioBuffer}
        />
      ) : null}
      <div className=' p-2 rounded bg-slate-200'>
        <SentencePitchLine pitchStr={pitchStr} />
      </div>
      <div className='flex flex-wrap gap-x-4'>
        {pitchStr.split(FULL_SPACE).map((wordPitch, wordIndex) => (
          <QuizFormWord
            key={wordIndex}
            pitchStr={wordPitch}
            isLocked={question.lockedIndexes.includes(wordIndex)}
            accentIndex={getAccentIndex(wordPitch)}
            handleClick={(index: number) => handleClick(wordIndex, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizFormSentence;
