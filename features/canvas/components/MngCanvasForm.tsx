'use client';

import { Input } from '@/components/ui/input';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Box } from '../class/Box';
import { DraggableField } from '../class/DraggableField';
import { DummyDOM } from '../class/DummyDOM';
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
  splitBy: 0,
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

  // initializing
  useEffect(() => {
    if (!canvas.current || !data || !value.initializing) return;

    const { label } = data;
    setValue((prev) => ({
      ...prev,
      initializing: false,
      label,
    }));

    // calc Box Size
    const dummy = new DummyDOM(0, 0, label, document, value.splitBy);
    console.log(dummy);

    const field = new DraggableField(RECT.width, RECT.height, canvas.current);
    const box = new Box(0, 0, label, BG_COLOR);
    ref.current = { field, box };

    field.setHandleSplitBy(handleSplitBy);
    field.add(box);
    field.redraw();
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
      <Input
        placeholder='label'
        value={value.label}
        onChange={handleChangeLabel}
      />
      <pre className='text-xs'>{JSON.stringify(value, null, 2)}</pre>
      <CanvasDom ref={canvas} />
    </div>
  );
};

export default MngCanvasForm;

// const DummyDOM = forwardRef<HTMLDivElement, { label: string; splitBy: number }>(
//   ({ label, splitBy }, ref) => {
//     const charSets = useMemo(() => {
//       return splitBy
//         ? [label.substring(0, splitBy), label.substring(splitBy)]
//         : [label];
//     }, [splitBy, label]);
//     return (
//       <div
//         ref={ref}
//         className='fixed z-10 top-0 left-0 p-[1rem] bg-slate-400 flex items-center text-white justify-center text-sm h-16 gap-8 min-w-24 font-sans'
//       >
//         {charSets.map((charSet, index) => (
//           <div key={index} className='flex items-center justify-center'>
//             {charSet.split('').map((char, index) => (
//               <div key={index}>{char}</div>
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   }
// );

// DummyDOM.displayName = 'DummyDOM';
