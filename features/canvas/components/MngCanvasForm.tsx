'use client';

import { Input } from '@/components/ui/input';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Box } from '../class/Box';
import { DraggableField } from '../class/DraggableField';
import { RECT } from '../constants';
import { Canvas } from '../schema';
import CanvasDom from './CanvasDom';

type Props = { canvas: Canvas | undefined };

type FormProps = { initializing: boolean; label: string };

const INITIAL_STATE: FormProps = {
  initializing: true,
  label: '',
};

type RefProps = {
  box: Box;
  field: DraggableField;
};

const INITIAL_REF: RefProps = {
  box: new Box('', 'green'),
  field: new DraggableField(RECT.width, RECT.height),
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
    field.redraw();

    box.label = label;
    setValue({ initializing: false, label });
  }, [data, value]);

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    const { box, field } = ref.current;

    box.updateLabel(label);
    field.redraw();
    setValue((prev) => ({ ...prev, label }));
  };

  return (
    <div className='grid gap-4'>
      <Input
        placeholder='label'
        value={value.label}
        onChange={handleChangeLabel}
      />
      <CanvasDom ref={canvas} />
    </div>
  );
};

export default MngCanvasForm;
