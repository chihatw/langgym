import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Triangle } from 'lucide-react';

type Props = {
  isAccent: boolean;
  isLocked: boolean;
  handleClick: () => void;
};

const AccentToggleButton = ({ isAccent, isLocked, handleClick }: Props) => {
  return (
    <div className='absolute left-[11px] top-0 flex flex-col items-center w-6'>
      <div
        className={cn(
          'h-5 w-[2px] border-l-2 border-dashed ',
          isAccent ? 'border-red-500' : 'border-[#52a2aa]'
        )}
      />
      <Button
        size='icon'
        variant={'ghost'}
        className='h-5 w-full hover:bg-slate-200 '
        onClick={handleClick}
        disabled={isLocked}
      >
        <Triangle
          className={cn(
            'w-3 h-3',
            isAccent ? 'text-red-500' : 'text-[#52a2aa] '
          )}
        />
      </Button>
    </div>
  );
};

export default AccentToggleButton;
