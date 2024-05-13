'use client';

import { Input } from '@/components/ui/input';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Box } from '../class/Box';
import { DraggableField } from '../class/DraggableField';
import { BG_COLOR, RECT } from '../constants';
import { Canvas } from '../schema';
import CanvasDom from './CanvasDom';

type Props = { canvas: Canvas | undefined };

type FormProps = {
  initializing: boolean;
  label: string;
  splitBy: number;
  selectedBoxId: string;
};

const INITIAL_STATE: FormProps = {
  initializing: true,
  label: '',
  splitBy: -1,
  selectedBoxId: '',
};

// box は field に隠蔽する？
type RefProps = {
  box: Box | null;
  field: DraggableField | null;
};

const INITIAL_REF: RefProps = {
  box: null,
  field: null,
};

// MngPaneContainer で children が 表示/非表示の切り替えがあるので、層を分ける
const MngCanvasForm = ({ canvas: data }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ref = useRef(INITIAL_REF);
  const dummyDOM = useRef<HTMLDivElement>(null);

  // initializing
  useEffect(() => {
    if (!data || !value.initializing) return;
    const { label } = data;
    // todo calc Box and Chars Size
    const field = new DraggableField(RECT.width, RECT.height);
    const box = new Box(0, 0, '', BG_COLOR);

    ref.current = { field, box };

    // Set Canvas
    field.setCanvas(canvas.current!); // setCanvas をコンストラクタに入れては？
    field.add(box);
    field.redraw();

    box.setLabel(label);
    setValue((prev) => ({ ...prev, initializing: false, label }));
  }, [data, value]);

  const handleSplitBy = (splitBy: number) => {
    setValue((prev) => ({ ...prev, splitBy }));
  };

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    const { box, field } = ref.current;

    if (!box || !field) throw Error();

    box.updateLabel(label); // 直接 box を触るのではなく、feild に対する操作を挟む？
    field.redraw();
    setValue((prev) => ({ ...prev, label }));
  };

  return (
    <div className='grid gap-4'>
      <div
        ref={dummyDOM}
        className='fixed z-10 top-0 left-0 p-[1rem] bg-slate-900 flex items-center text-white justify-center text-sm h-16 gap-8 min-w-24 font-sans'
      />
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
