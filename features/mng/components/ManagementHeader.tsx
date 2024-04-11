import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

type Props = {};

const items: { label: string; href: string }[] = [
  { label: 'article list', href: '/mng' },
  { label: 'dummy', href: '/' },
];

const ManagementHeader = (props: Props) => {
  return (
    <div>
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={buttonVariants({ variant: 'ghost' })}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default ManagementHeader;
