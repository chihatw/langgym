'use client';

import { Input } from '@/components/ui/input';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { Box } from '../class/Box';
import { Field } from '../class/Field';
import { RECT } from '../constants';
import { Canvas } from '../schema';

type Props = { canvas: Canvas | undefined };

type FormProps = { initializing: boolean; label: string };

const INITIAL_STATE: FormProps = {
  initializing: true,
  label: '',
};

type RefProps = {
  box: Box;
  field: Field;
};

const INITIAL_REF: RefProps = {
  box: new Box('', 'green'),
  field: new Field(RECT.width, RECT.height),
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

    box.label = label;
    setValue({ initializing: false, label });
  }, [data, value]);

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    const { box } = ref.current;

    box.updateLabel(label);
    setValue((prev) => ({ ...prev, label }));
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
      <div
        style={{ width: RECT.width, height: RECT.height }}
        className='overflow-hidden'
      >
        <canvas
          ref={canvas}
          width={RECT.width}
          height={RECT.height}
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
