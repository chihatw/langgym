'use client';

import { Input } from '@/components/ui/input';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Box } from '../class/Box';
import { Field } from '../class/Field';
import { Canvas } from '../schema';

type Props = { canvas: Canvas | undefined };

type FormProps = { initializing: boolean; label: string };

const INITIAL_STATE: FormProps = {
  initializing: true,
  label: '',
};

type RefProps = {
  dpr: number;
  box: Box;
  field: Field;
};

const INITIAL_REF: RefProps = {
  dpr: (() => {
    if (typeof window === 'undefined') return 1;
    return window.devicePixelRatio || 1;
  })(),
  box: new Box('', 'green'),
  field: new Field(),
};

// MngPaneContainer で children が 表示/非表示の切り替えがあるので、層を分ける
const MngCanvasForm = ({ canvas: data }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ref = useRef(INITIAL_REF);

  // initializing
  useEffect(() => {
    if (!data || !value.initializing) return;
    const { field, box } = ref.current;
    const { label } = data;

    // Set Canvas
    field.setCanvas(canvas.current!);
    field.add(box);
    field.start();

    // Set remote value
    box.label = label;
    setValue({ initializing: false, label });
  }, [data, value]);

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    const { box } = ref.current;
    box.label = label;
    setValue((prev) => ({ ...prev, label }));
    box.updateLabel(box.label);
  };

  const handleMouseMove = (
    e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    const { offsetX: x, offsetY: y } = e.nativeEvent;
    const { box } = ref.current;
    box.getMousePos(x, y);
  };

  const handleMouseDown = (
    e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>
  ) => {
    const { offsetX: x, offsetY: y } = e.nativeEvent;
    const { box } = ref.current;
    box.grab(x, y);
  };

  const handleMouseUp = () => {
    const { box } = ref.current;
    box.ungrab();
  };

  return (
    <div className='grid gap-4'>
      <Input
        placeholder='label'
        value={value.label}
        onChange={handleChangeLabel}
      />
      <div className='w-[512px] h-[320px] overflow-hidden'>
        <canvas
          ref={canvas}
          width={512}
          height={320}
          style={{
            transform: `scale(1/${ref.current.dpr},1/${ref.current.dpr})`,
          }}
          className='bg-white origin-top-left'
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        ></canvas>
      </div>
    </div>
  );
};

export default MngCanvasForm;
