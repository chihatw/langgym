import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
];

const MngHeader = (props: Props) => {
  return (
    <div className='print:hidden flex gap-2 mt-4 flex-wrap'>
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
