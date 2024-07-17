'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useOptimistic } from 'react';
import { REDIRECT_TO_URLS } from '../../constants';
import { RedirectToView } from '../../schema';
import { updateRedirectTo } from '../../services/actions';

type Props = {
  redirectTo: RedirectToView;
};

const MngRedirectToFormRow = ({ redirectTo }: Props) => {
  const [optiRedirectTo, setOptiRedirectTo] = useOptimistic<string, string>(
    redirectTo.redirect_to!,
    (_, redirectTo) => {
      return redirectTo;
    }
  );

  const action = async (url: string) => {
    // local
    setOptiRedirectTo(url);

    // remote
    updateRedirectTo(redirectTo.id!, url);
  };

  return (
    <div className='round p-2 bg-white/50 grid gap-4'>
      <div className='grid grid-cols-[40px,1fr] items-center text-xs'>
        <div className='font-extrabold'>{redirectTo.display}</div>
        <div>{redirectTo.redirect_to}</div>
      </div>
      <div className='flex flex-wrap gap-4 text-xs'>
        {REDIRECT_TO_URLS.map((item, index) => (
          <form key={index} action={() => action(item.url)}>
            <Button
              type='submit'
              className={cn(
                'px-1 py-0 m-0 h-auto',
                optiRedirectTo === item.url
                  ? 'bg-slate-300 hover:bg-slate-300'
                  : ''
              )}
              variant={'ghost'}
            >
              {item.label}
            </Button>
          </form>
        ))}
      </div>
    </div>
  );
};

export default MngRedirectToFormRow;
