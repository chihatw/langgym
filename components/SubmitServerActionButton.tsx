'use client';

import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

type Props = {
  errMsg?: string;
  disabled?: boolean;
  isPending?: boolean;
  action?: (formData: FormData) => void;
  children: React.ReactNode;
  className?: string;
};

const SubmitServerActionButton = ({
  errMsg,
  disabled,
  isPending,
  action,
  children,
  className,
}: Props) => {
  return (
    <>
      <form action={action} className='grid'>
        <Button
          type='submit'
          disabled={disabled || isPending}
          className={cn('flex items-center gap-x-0.5', className)}
        >
          {children}
          {isPending ? <Loader2 className='animate-spin' /> : null}
        </Button>
      </form>
      {errMsg ? <div className='text-xs text-red-500'>{errMsg}</div> : null}
    </>
  );
};

export default SubmitServerActionButton;
