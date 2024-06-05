import { cn } from '@/lib/utils';

type Props = {
  toggle: boolean;
  children: React.ReactNode;
};

const FlipWrapper = ({ toggle, children }: Props) => {
  return (
    <div
      className={cn(
        'transition-transform duration-500 ',
        toggle ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
      )}
    >
      {children}
    </div>
  );
};

export default FlipWrapper;
