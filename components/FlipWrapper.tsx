import { cn } from '@/lib/utils';

type Props = {
  toggle: boolean;
  children: React.ReactNode;
};

const FlipWrapper = ({ toggle, children }: Props) => {
  return (
    <div
      style={{ transformStyle: 'preserve-3d' }}
      className={cn(
        'relative transition-transform duration-500 ',
        toggle ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
      )}
    >
      {children}
    </div>
  );
};

export default FlipWrapper;
