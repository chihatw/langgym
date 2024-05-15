'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useRef, useState } from 'react';
import { Box } from '../../class/Box';
import { DraggableField } from '../../class/DraggableField';
import { MODE, RECT } from '../../constants';
import { deleteAllBoxes } from '../../services/client';
import CanvasDom from '../CanvasDom';
import AddBoxButton from './AddBoxButton';
import DeleteBoxButton from './DeleteBoxButton';
import LabelInput from './LabelInput';

type Props = {};

type FormProps = {
  field: DraggableField | null;
  selectedObj: Box | null;
};

const INITIAL_STATE: FormProps = {
  field: null,
  selectedObj: null,
};

// MngPaneContainer で children が 表示/非表示の切り替えがあるので、層を分ける
const MngCanvasForm = ({}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const canvas = useRef<HTMLCanvasElement>(null);

  // initializing
  useEffect(() => {
    if (!canvas.current) throw new Error();

    // 一旦白紙に
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
    setValue((prev) => ({ ...prev, field }));
    field.redraw('initialize');
  }, []);

  const handleChangeMode = (mode: string) => {
    // canvas
    if (!value.field) throw new Error();
    value.field.updateMode(mode);

    // local
    setValue((prev) => ({ ...prev }));
  };

  return (
    <div className='grid gap-4'>
      <AddBoxButton field={value.field} defaultLabel='こんにちは' />
      <DeleteBoxButton
        selectedObj={value.selectedObj}
        field={value.field}
        deselect={() => setValue((prev) => ({ ...prev, selectedObj: null }))}
      />
      <Select
        value={value.field?.mode || MODE.drag}
        onValueChange={(value) => handleChangeMode(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder='Mode' />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(MODE).map(([key, value], index) => (
            <SelectItem value={key} key={index}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <LabelInput
        field={value.field}
        selectedObj={value.selectedObj}
        rerender={() => setValue((prev) => ({ ...prev }))}
      />
      <CanvasDom ref={canvas} mode={value.field?.mode} />
    </div>
  );
};

export default MngCanvasForm;
