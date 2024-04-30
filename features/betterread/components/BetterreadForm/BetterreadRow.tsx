import { BetterReadImagePathView } from '../../schema';
import ImagePane from './ImagePane';

type Props = {
  imagePath: BetterReadImagePathView;
};

const BetterreadRow = ({ imagePath }: Props) => {
  if (!imagePath.index) {
    return (
      <div className='flex gap-4'>
        <div className='basis-2 text-right text-xs'>{imagePath.index! + 1}</div>
        <div className='flex-1 space-y-2'>
          <div className='text-sm font-extrabold'>{imagePath.japanese}</div>
          <div className='text-xs text-green-600'>{imagePath.chinese}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex gap-4'>
      <div className='basis-2 text-right text-xs'>{imagePath.index + 1}</div>
      <div className='flex-1 space-y-2'>
        <div className='text-sm font-extrabold'>{imagePath.japanese}</div>
        <div className='text-xs text-green-600'>{imagePath.chinese}</div>

        <div className='grid gap-2 rounded-lg bg-white bg-opacity-60 p-3'>
          <div className='text-xs font-extrabold'>🎥 分鏡</div>
          <ImagePane imagePath={imagePath} />
        </div>
      </div>
    </div>
  );
};

export default BetterreadRow;
