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
};

const INITIAL_STATE: FormProps = {
  field: null,
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
    (e: globalThis.KeyboardEvent) => {
      if (!e.metaKey) return;

      switch (e.key) {
        case 'a':
          e.preventDefault();
          if (!value.field) throw Error();
          const box = new Box(
            (value.field.width - 96) / 2,
            (value.field.height - 48) / 2,
            '',
            0
          );
          value.field.objs = [...value.field.objs, box];
          // obj が１つだけの場合は、それを選択して、Input にフォーカス
          if (value.field.objs.length === 1) {
            const targetObj = value.field.objs.at(0)!;
            value.field.select(targetObj);
            value.field.redraw('short cur select');
            input.current?.focus();
          }
          value.field.redraw('add box');
          break;
        case 'd':
          e.preventDefault();
          // canvas
          if (!value.field) throw new Error();
          value.field.updateMode(MODE.drag);
          // local
          setValue((prev) => ({ ...prev }));
          break;
        case 's':
          e.preventDefault();
          // canvas
          if (!value.field) throw new Error();
          value.field.updateMode(MODE.select);

          // obj が１つだけの場合は、それを選択して、Input にフォーカス
          if (value.field.objs.length === 1) {
            const targetObj = value.field.objs.at(0)!;
            value.field.select(targetObj);
            value.field.redraw('short cur select');
            input.current?.focus();
          }

          // local
          setValue((prev) => ({ ...prev }));
          break;
        case 'e':
          e.preventDefault();
          // canvas
          if (!value.field) throw new Error();
          value.field.updateMode(MODE.split);
          // local
          setValue((prev) => ({ ...prev }));
          break;
        case 'h':
          e.preventDefault();
          // canvas
          if (!value.field) throw new Error();
          value.field.updateMode(MODE.highlight);
          // local
          setValue((prev) => ({ ...prev }));
          break;
        case 'c':
          e.preventDefault();
          // canvas
          if (!value.field) throw new Error();
          value.field.updateMode(MODE.connect);
          // local
          setValue((prev) => ({ ...prev }));
          break;
        case 'l':
          e.preventDefault();
          input.current?.focus();
          break;
        case 'x':
          e.preventDefault();
          // delete
          if (!value.field) throw new Error();
          if (!value.field.selectObj) return;
          value.field.delete(value.field.selectObj);
          setValue((prev) => ({ ...prev, selectedObj: null }));

          break;
        default:
          console.log(e.key);
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
        selectedObj={value.field?.selectObj || null}
        field={value.field}
        rerender={() => setValue((prev) => ({ ...prev }))}
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
        selectedObj={value.field?.selectObj || null}
        rerender={() => setValue((prev) => ({ ...prev }))}
      />
      <CanvasDom ref={canvas} mode={value.field?.mode} />
      <div className='text-xs text-slate-400 grid gap-2'>
        <div>Keyboard Short Cut:</div>
        <div className='grid grid-cols-[24px,1fr] pl-4 gap-y-1'>
          <div>⌘a</div>
          <div>
            <div>add new box</div>
            <div>obj が1つの場合はそれを選択して Input をフォーカス</div>
          </div>
          <div>⌘d</div>
          <div>drag mode</div>
          <div>⌘s</div>
          <div>
            <div>select mode</div>
            <div>obj が1つの場合はそれを選択して Input をフォーカス</div>
          </div>
          <div>⌘e</div>
          <div>split mode</div>
          <div>⌘h</div>
          <div>highlight mode</div>
          <div>⌘c</div>
          <div>connect mode</div>
          <div>⌘l</div>
          <div>Input をフォーカス</div>
          <div>⌘x</div>
          <div>選択オブジェクトの削除</div>
        </div>
      </div>
    </div>
  );
};

export default MngCanvasForm;
