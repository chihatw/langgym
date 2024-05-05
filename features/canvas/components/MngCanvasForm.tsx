'use client';

import MngPaneContainer from '@/components/MngPaneContainer';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { RECT_SIZE } from '../constants';
import { Canvas } from '../schema';
import { updateCanvasXPosYPos } from '../services/client';

type Props = {};

type FormProps = Canvas & {
  isActive: boolean;
  canvasRect: { top: number; left: number } | undefined;
};

const INITIAL_STATE: FormProps = {
  xPos: 0,
  yPos: 0,
  isActive: false,
  canvasRect: undefined,
};

const MngCanvasForm = (props: Props) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [value, setValue] = useState(INITIAL_STATE);

  // スクロール時に canvas の位置を設定する
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const rect = canvas.current?.getBoundingClientRect();
      setValue((prev) => ({
        ...prev,
        canvasRect: rect
          ? {
              top: rect.top,
              left: rect.left,
            }
          : undefined,
      }));
    });
  }, []);

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

  const handleMouseDown = (
    e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    if (!value.canvasRect) return;
    const xPos = Math.max(e.clientX - value.canvasRect!.left, 0);
    const yPos = Math.max(e.clientY - value.canvasRect!.top, 0);

    // local
    setValue((prev) => ({ ...prev, isActive: true, xPos, yPos }));

    // remote
    updateCanvasXPosYPos(xPos, yPos);
  };

  const handleMouseUp = () => {
    setValue((prev) => ({ ...prev, isActive: false }));
  };

  const handleMouseMove = (
    e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    if (!value.canvasRect || !value.isActive) return;

    const xPos = Math.max(e.clientX - value.canvasRect!.left, 0);
    const yPos = Math.max(e.clientY - value.canvasRect!.top, 0);

    // local
    setValue((prev) => ({
      ...prev,
      xPos,
      yPos,
    }));

    // remote
    updateCanvasXPosYPos(xPos, yPos);
  };

  return (
    <MngPaneContainer label='Canvas'>
      <div className='grid gap-4'>
        <div className='text-2xl font-extrabold'>Canvas</div>
        <pre className='text-[10px] select-none'>
          {JSON.stringify(value, null, 2)}
        </pre>
        <canvas
          ref={canvas}
          width={512}
          height={320}
          className='bg-white'
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>
    </MngPaneContainer>
  );
};

export default MngCanvasForm;
