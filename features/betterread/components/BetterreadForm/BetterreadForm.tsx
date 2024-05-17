import { BetterReadImagePathView } from '../../schema';
import BetterreadRow from './BetterreadRow';

type Props = {
  imagePaths: BetterReadImagePathView[];
};

const BetterreadForm = ({ imagePaths }: Props) => {
  return (
    <div className='grid gap-4'>
      <div className='text-2xl font-extrabold'>課前準備</div>
      <div className='grid gap-8'>
        {imagePaths.map((imagePath, index) => (
          <BetterreadRow key={index} imagePath={imagePath} />
        ))}
      </div>
    </div>
  );
};

export default BetterreadForm;
