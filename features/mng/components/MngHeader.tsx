import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Props = {};

const items: { label: string; href: string }[] = [
  { label: 'article list', href: '/' },
  { label: 'dummy', href: '/' },
];

const MngHeader = (props: Props) => {
  return (
    <div className='print:hidden space-x-2 pt-4'>
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
