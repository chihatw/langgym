import AccentToggleButton from './AccentToggleButton';

type Props = {
  mora: string;
  noAccent: boolean;
  isAccent: boolean;
  isLocked: boolean;
  handleClick: () => void;
};

const QuizFormMora = ({
  mora,
  noAccent,
  isAccent,
  isLocked,
  handleClick,
}: Props) => {
  return (
    <div className='relative h-10'>
      <div className='text-xs w-5 text-center whitespace-nowrap'>{mora}</div>
      {!noAccent ? (
        <AccentToggleButton
          isAccent={isAccent}
          isLocked={isLocked}
          handleClick={handleClick}
        />
      ) : null}
    </div>
  );
};

export default QuizFormMora;
