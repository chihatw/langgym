import Link from 'next/link';
import { BetterReadView } from '../schema';

type Props = {
  betterread: BetterReadView;
};

const Betterread = ({ betterread }: Props) => {
  return (
    <div className='p-5 bg-white/60 rounded-lg grid gap-4'>
      <Link
        href={`/betterread/${betterread.id}`}
        className='hover:cursor-pointer'
      >
        <div className='grid gap-4 '>{betterread.title}</div>
      </Link>
    </div>
  );
};

export default Betterread;
