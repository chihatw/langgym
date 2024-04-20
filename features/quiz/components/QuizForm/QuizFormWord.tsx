import { buildMoras } from '@/features/pitchLine/services/utils';
import { cn } from '@/lib/utils';
import QuizFormMora from './QuizFormMora';

type Props = {
  isLocked: boolean;
  pitchStr: string;
  accentIndex: number;
  handleClick: (index: number) => void;
};

const QuizFormWord = ({
  pitchStr,
  isLocked,
  handleClick,
  accentIndex,
}: Props) => {
  const moras = buildMoras(pitchStr);
  return (
    <div
      className={cn(
        'flex flex-nowrap p-1 rounded gap-x-2',
        isLocked && 'bg-slate-200'
      )}
    >
      {moras.map((mora, index) => {
        return (
          <QuizFormMora
            key={index}
            mora={mora}
            noAccent={index === moras.length - 1 || ['っ', 'ッ'].includes(mora)}
            isAccent={index + 1 === accentIndex}
            isLocked={isLocked}
            handleClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};

export default QuizFormWord;
