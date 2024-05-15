'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../../class/Box';
import { DraggableField } from '../../class/DraggableField';
import { MODE, MODE_SHORT_CUT_KEY, RECT } from '../../constants';
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
  const input = useRef<HTMLInputElement>(null);

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

  const handleKeyDown = useCallback(
    (event: globalThis.KeyboardEvent) => {
      if (!event.metaKey) return;

      switch (event.key) {
        case 'a':
          event.preventDefault();
          if (!value.field) throw Error();
          const box = new Box(
            (value.field.width - 96) / 2,
            (value.field.height - 48) / 2,
            '',
            0
          );
          value.field.objs = [...value.field.objs, box];
          value.field.redraw('add box');
          break;
        case 'd':
          event.preventDefault();
          // canvas
          if (!value.field) throw new Error();
          value.field.updateMode(MODE.drag);
          // local
          setValue((prev) => ({ ...prev }));
          break;
        case 's':
          event.preventDefault();
          // canvas
          if (!value.field) throw new Error();
          value.field.updateMode(MODE.select);
          // local
          setValue((prev) => ({ ...prev }));
          break;
        case 'e':
          event.preventDefault();
          // canvas
          if (!value.field) throw new Error();
          value.field.updateMode(MODE.split);
          // local
          setValue((prev) => ({ ...prev }));
          break;
        case 'h':
          event.preventDefault();
          // canvas
          if (!value.field) throw new Error();
          value.field.updateMode(MODE.highlight);
          // local
          setValue((prev) => ({ ...prev }));
          break;
        case 'c':
          event.preventDefault();
          // canvas
          if (!value.field) throw new Error();
          value.field.updateMode(MODE.connect);
          // local
          setValue((prev) => ({ ...prev }));
          break;
        case 'l':
          event.preventDefault();
          input.current?.focus();
          break;
        default:
          console.log(event.key);
      }
    },
    [value]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleChangeMode = (mode: string) => {
    // canvas
    if (!value.field) throw new Error();
    value.field.updateMode(mode);

    // local
    setValue((prev) => ({ ...prev }));
  };

  return (
    <div className='grid gap-4'>
      <AddBoxButton field={value.field} defaultLabel='' />
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
              {`${value} (${MODE_SHORT_CUT_KEY[value]})`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <LabelInput
        ref={input}
        field={value.field}
        selectedObj={value.selectedObj}
        rerender={() => setValue((prev) => ({ ...prev }))}
      />
      <CanvasDom ref={canvas} mode={value.field?.mode} />
    </div>
  );
};

export default MngCanvasForm;
