'use client';

import MngPaneContainer from '@/components/MngPaneContainer';
import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';

type Props = {};

type FormProps = {
  xPos: number;
  yPos: number;
};

const INITIAL_STATE: FormProps = {
  xPos: 0,
  yPos: 0,
};

const RECT_SIZE = 10;

const MngCanvasForm = (props: Props) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [value, setValue] = useState(INITIAL_STATE);

  const rect = useMemo(() => {
    return canvas.current?.getBoundingClientRect();
  }, [canvas]);

  // 点の描画
  useEffect(() => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.fillStyle = 'rgb(200,0,0)';
    ctx.fillRect(
      value.xPos - RECT_SIZE / 2,
      value.yPos - RECT_SIZE / 2,
      RECT_SIZE,
      RECT_SIZE
    );
  }, [value]);

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
        <pre className='text-[10px]'>{JSON.stringify(value, null, 2)}</pre>
        <canvas
          ref={canvas}
          width={512}
          height={320}
          className='bg-white'
          onMouseMove={handleMouseMove}
        ></canvas>
      </div>
    </MngPaneContainer>
  );
};

export default MngCanvasForm;
