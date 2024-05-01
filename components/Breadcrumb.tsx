import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
type Props = {
  label?: string;
  labels?: string[];
  hrefs?: string[];
};

const Breadcrumb = ({ label, labels, hrefs }: Props) => {
  return (
    <div className={'flex items-center text-slate-500 '}>
      <Link
        href={'/'}
        className={cn(buttonVariants({ variant: 'ghost' }), 'mx-0 px-0')}
      >
        <Home />
      </Link>
      {!!label ? (
        <>
          <ChevronRight />
          <div className='text-xs '>{label}</div>
        </>
      ) : null}
      {!!labels &&
        !!hrefs &&
        labels.map((label, index) => {
          const isLast = !labels.at(index + 1);

          if (isLast) {
            return (
              <div key={index} className='flex items-center'>
                <ChevronRight />
                <div className='text-xs '>{label}</div>
              </div>
            );
          }
          return (
            <div key={index} className='flex items-center'>
              <ChevronRight />
              <Link
                href={hrefs.at(index)!}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'mx-0 px-0'
                )}
              >
                <div className='text-xs '>{label}</div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Breadcrumb;
