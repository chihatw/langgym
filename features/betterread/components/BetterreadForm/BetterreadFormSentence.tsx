import { BetterReadView } from '../../schema';

type Props = { betterread: BetterReadView };

const BetterreadFormSentence = ({ betterread }: Props) => {
  return (
    <div className='px-2 gap gap-1'>
      <div className='text-sm'>{betterread.japanese}</div>
      <div className='text-xs text-green-600'>{betterread.chinese}</div>
    </div>
  );
};

export default BetterreadFormSentence;
