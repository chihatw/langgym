'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Box } from '../class/Box';
import { DraggableField } from '../class/DraggableField';
import { RECT } from '../constants';
import { deleteAllBoxes, deleteBox } from '../services/client';
import CanvasDom from './CanvasDom';

type Props = {};

type FormProps = {
  selectedObj: Box | null;
};

const INITIAL_STATE: FormProps = {
  selectedObj: null,
};

type RefProps = {
  field: DraggableField | null;
};

const INITIAL_REF: RefProps = {
  field: null,
};

// MngPaneContainer で children が 表示/非表示の切り替えがあるので、層を分ける
const MngCanvasForm = ({}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const canvas = useRef<HTMLCanvasElement>(null);
  const ref = useRef(INITIAL_REF);

  // initializing
  useEffect(() => {
    if (!canvas.current) throw new Error();
    deleteAllBoxes();
    const field = new DraggableField(
      RECT.width,
      RECT.height,
      canvas.current,
      (obj: Box | null) => {
        setValue((prev) => ({
          ...prev,
          selectedObj: obj,
        }));
      }
    );
    ref.current = { field };
    field.redraw('initialize');
  }, []);

  const handleAddBox = () => {
    const { field } = ref.current;
    if (!field) throw Error();
    const box = new Box(0, 0, 'こんにちは', 0);
    field.objs = [...field.objs, box];
    field.redraw('add box');
  };

  const handleChangeLabel = (e: ChangeEvent<HTMLInputElement>) => {
    const label = e.target.value;
    const { field } = ref.current;
    if (!field) throw Error();

    if (!field.selectObj) return;

    field.updateLabel(label);
    setValue((prev) => ({
      ...prev,
      selectedObj: field.selectObj,
    }));
  };

  const handleDeleteBox = () => {
    const { field } = ref.current;
    if (!field) throw Error();

    if (!value.selectedObj) throw new Error();

    field.delete(value.selectedObj);

    // local
    setValue((prev) => ({ ...prev, selectedObj: null }));

    // remote
    deleteBox(value.selectedObj.id);
  };

  return (
    <div className='grid gap-4'>
      <Button onClick={handleAddBox}>Add New Box</Button>
      <Button
        disabled={!value.selectedObj}
        variant={'destructive'}
        onClick={handleDeleteBox}
      >
        Delete Selected Box
      </Button>
      <Input
        placeholder='label'
        value={value.selectedObj?.label || ''}
        onChange={handleChangeLabel}
      />
      {/* <pre className='text-xs'>{JSON.stringify(value, null, 2)}</pre> */}
      <CanvasDom ref={canvas} />
    </div>
  );
};

export default MngCanvasForm;
