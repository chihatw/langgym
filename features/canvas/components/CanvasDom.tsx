import { cn } from '@/lib/utils';
import { forwardRef, useMemo } from 'react';
import { MODE, RECT } from '../constants';

type Props = {
  mode?: string;
};

const CanvasDom = forwardRef<HTMLCanvasElement, Props>(({ mode }, ref) => {
  const bgColor = useMemo(() => {
    switch (mode) {
      case MODE.new:
        return 'bg-red-300';
      case MODE.shift:
        return 'bg-blue-300';
      case MODE.highlight:
        return 'bg-yellow-100';
      case MODE.connect:
        return 'bg-purple-100';
      // これは残す
      default:
        return 'bg-white';
    }
  }, [mode]);

  return (
    <div
      style={{ width: RECT.width, height: RECT.height }}
      className='overflow-hidden'
    >
      <canvas
        ref={ref}
        width={RECT.width}
        height={RECT.height}
        className={cn('origin-top-left', bgColor)}
      ></canvas>
    </div>
  );
});

export default CanvasDom;

CanvasDom.displayName = 'CanvasDom';
