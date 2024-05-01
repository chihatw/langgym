import { X } from 'lucide-react';
import { TARGET } from '../../constants';
import { CuePattern } from '../../schema';

type Props = {
  index: number;
  pattern: CuePattern;
};

const PaperCupPatternRow = ({ index, pattern }: Props) => {
  const topicCell =
    pattern.topic === TARGET.none ? (
      <X size={12} />
    ) : pattern.topic === TARGET.wo ? (
      'ヲ格'
    ) : (
      'ニ格'
    );
  const groupingCell =
    pattern.grouping === TARGET.none ? (
      <X size={12} />
    ) : pattern.grouping === TARGET.wo ? (
      'ヲ格'
    ) : (
      'ニ格'
    );
  return (
    <div className='grid grid-cols-8 py-2 text-sm'>
      <div className='flex items-center justify-center '>{index + 1}</div>
      <div className='col-span-3 flex items-center justify-center'>
        {pattern.sentence}
      </div>
      <div className='flex items-center justify-center text-sm'>
        {topicCell}
      </div>
      <div className='flex items-center justify-center text-sm'>
        {groupingCell}
      </div>
      <div className='flex items-center justify-center text-sm'>
        {pattern.isWoFirst ? '正' : '逆'}
      </div>
      <div className='flex items-center justify-center text-sm'>
        {pattern.isNegative ? '否' : '肯'}
      </div>
    </div>
  );
};

export default PaperCupPatternRow;
