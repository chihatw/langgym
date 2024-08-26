import Link from 'next/link';
import { BetterRead } from '../schema';

type Props = {
  title: string;
  betterread: BetterRead;
};

const Betterread = ({ betterread, title }: Props) => {
  return (
    <div className='p-5 bg-white/60 rounded-lg grid gap-4'>
      <Link
        href={`/betterread/${betterread.id}`}
        className='hover:cursor-pointer'
      >
        <div className='grid gap-4 '>{title}</div>
      </Link>
    </div>
  );
};

export default Betterread;
