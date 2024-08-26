type Props = {
  japanese: string;
  chinese: string;
};

const BetterreadFormSentence = ({ japanese, chinese }: Props) => {
  const isDummy = japanese === '-';
  return (
    <div className='px-2 gap gap-1'>
      {!isDummy ? <div className='text-sm'>{japanese}</div> : null}
      <div className='text-xs text-green-600'>{chinese}</div>
    </div>
  );
};

export default BetterreadFormSentence;
