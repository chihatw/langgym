'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Lato } from 'next/font/google';

type Props = {
  item: number;
  action: () => void;
};

const lato = Lato({ subsets: ['latin'], weight: '900' });

const MirrorWorkoutWorkoutButton = ({ item, action }: Props) => {
  return (
    <form action={action}>
      <Button className='bg-white h-48 hover:bg-slate-300 w-full'>
        <span
          className={cn(
            'text-slate-700 text-6xl scale-x-[-1] select-none',
            lato.className
          )}
        >
          {item}
        </span>
      </Button>
    </form>
  );
};

export default MirrorWorkoutWorkoutButton;
