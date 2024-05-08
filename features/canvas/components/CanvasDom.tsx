import { forwardRef } from 'react';
import { RECT } from '../constants';

type Props = {};

const CanvasDom = forwardRef<HTMLCanvasElement, Props>((props, ref) => {
  return (
    <div
      style={{ width: RECT.width, height: RECT.height }}
      className='overflow-hidden'
    >
      <canvas
        ref={ref}
        width={RECT.width}
        height={RECT.height}
        className='bg-white origin-top-left'
      ></canvas>
    </div>
  );
});

export default CanvasDom;

CanvasDom.displayName = 'CanvasDom';
