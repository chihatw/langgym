import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';

type Props = {};

const items: { label: string; href: string }[] = [
  { label: 'articles', href: '/' },
  { label: 'quizzes', href: '/mng/quiz/list' },
  { label: 'answers', href: '/mng/answer/list' },
  { label: 'workouts', href: '/mng/workout/list' },
  { label: 'results', href: '/mng/result/list' },
  { label: 'draft', href: '/mng/draft' },
  { label: 'real time', href: '/mng/realtime' },
  { label: 'mirror', href: '/mng/mirror/list' },
  { label: 'betterread', href: '/mng/betterread/list' },
  { label: 'checklist', href: '/mng/checklist' },
];

const MngHeader = (props: Props) => {
  return (
    <div className='print:hidden flex gap-2 mt-4 flex-wrap items-center'>
      <Link href={'/mng/auth'}>
        <CircleUser className='h-4 w-4' />
      </Link>
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={cn(buttonVariants({ variant: 'ghost' }), 'p-2 h-6')}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default MngHeader;
