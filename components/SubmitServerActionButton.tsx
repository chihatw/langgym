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
  size?: 'default' | 'sm' | 'lg' | 'icon' | null | undefined;
  variant?:
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
};

const SubmitServerActionButton = ({
  size,
  errMsg,
  variant,
  disabled,
  children,
  isPending,
  className,
  action,
}: Props) => {
  return (
    <>
      <form action={action} className='grid'>
        <Button
          type='submit'
          disabled={disabled || isPending}
          className={cn('flex items-center gap-x-0.5', className)}
          size={size}
          variant={variant}
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
