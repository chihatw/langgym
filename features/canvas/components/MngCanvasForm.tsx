'use client';

import MngPaneContainer from '@/components/MngPaneContainer';
import { MouseEvent, useMemo, useRef, useState } from 'react';

type Props = {};

type FormProps = {
  xPos: number;
  yPos: number;
};

const INITIAL_STATE: FormProps = {
  xPos: 0,
  yPos: 0,
};

const MngCanvasForm = (props: Props) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [value, setValue] = useState(INITIAL_STATE);

  const rect = useMemo(() => {
    return canvas.current?.getBoundingClientRect();
  }, [canvas]);

  const handleMouseMove = (
    e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    if (!rect) return;
    setValue((prev) => ({
      ...prev,
      xPos: Math.max(e.clientX - rect.left, 0),
      yPos: Math.max(e.clientY - rect.top, 0),
    }));
  };

  return (
    <MngPaneContainer label='Canvas'>
      <div className='grid gap-4'>
        <div className='text-2xl font-extrabold'>Canvas</div>
        <pre className='text-xs'>{JSON.stringify(value, null, 2)}</pre>
        <canvas
          ref={canvas}
          width={512}
          height={320}
          className='bg-white'
          onMouseMove={handleMouseMove}
        />
      </div>
    </MngPaneContainer>
  );
};

export default MngCanvasForm;
