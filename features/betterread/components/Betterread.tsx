import Link from 'next/link';
import { BetterReadImagePathView } from '../schema';

type Props = {
  imagePath: BetterReadImagePathView;
};

const Betterread = ({ imagePath }: Props) => {
  return (
    <div className='p-5 bg-white/60 rounded-lg grid gap-4'>
      <Link
        href={`/betterread/${imagePath.betterreadId}`}
        className='hover:cursor-pointer'
      >
        <div className='grid gap-4 '>{imagePath.title}</div>
      </Link>
    </div>
  );
};

export default Betterread;
