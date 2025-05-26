'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box } from '../../class/Box';
import { DraggableField } from '../../class/DraggableField/DraggableField';
import { MODE, RECT, REDRAW, SHORT_CUT_KEY } from '../../constants';
import { clearCanvas } from '../../services/client';
import CanvasDom from '../CanvasDom';
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
  const initializing = useRef(true);

  // initializing
  useEffect(() => {
    if (!initializing.current) return;
    if (!canvas.current) throw new Error();

    // 一旦白紙に
    clearCanvas();

    const field = new DraggableField(
      RECT.width,
      RECT.height,
      canvas.current,
      (obj: Box | null) => {
        setValue((prev) => ({
          ...prev,
          selectedObj: obj,
        }));
      },
      () => focusInput()
    );
    setValue((prev) => ({ ...prev, field }));
    field.redraw('initialize');
    initializing.current = false;
  }, [value]);

  const focusInput = () => {
    input.current?.focus();
  };

  const handleKeyDown = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Shift') {
        if (!value.field) throw Error();
        // new モード以外は処理しない
        if (value.field.mode !== MODE.new) return;

        // input をできる状態の時は処理しない
        if (!!value.field.selectObj) return;

        e.preventDefault();

        // canvas
        value.field.updateMode(MODE.shift);

        // 再描画
        setValue((prev) => ({ ...prev }));
        return;
      }

      // will delete?
      if (!e.metaKey) return;

      switch (e.key) {
        case SHORT_CUT_KEY.highlight:
          e.preventDefault();

          if (!value.field) throw new Error();
          // canvas
          value.field.updateMode(MODE.highlight);

          // 再描画
          setValue((prev) => ({ ...prev }));
          break;
        default:
      }
    },
    [value]
  );

  const handleKeyUp = useCallback(
    (e: globalThis.KeyboardEvent) => {
      if (!value.field) throw Error();

      // shift 以外の場合は処理しない
      if (value.field.mode !== MODE.shift) return;

      e.preventDefault();

      // canvas
      value.field.updateMode(MODE.new);

      // 再描画
      setValue((prev) => ({ ...prev }));
    },
    [value]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  // will delete
  const handleChangeMode = (mode: string) => {
    if (!value.field) throw new Error();

    // canvas
    value.field.updateMode(mode);

    // 再描画
    setValue((prev) => ({ ...prev }));
  };

  const handleDelteAll = () => {
    if (!value.field) throw new Error();

    // canvas
    value.field.objs = [];
    value.field.connectedObjSets = [];
    value.field.redraw(REDRAW.clearCanvas);

    //  remote
    clearCanvas();
  };

  return (
    <div className='grid gap-4'>
      <Select
        value={value.field?.mode || MODE.new}
        onValueChange={(value) => handleChangeMode(value)}
      >
        <SelectTrigger>
          <SelectValue placeholder='Mode' />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(MODE).map(([key, value], index) => (
            <SelectItem value={key} key={index}>
              {`${value} (⌘${
                SHORT_CUT_KEY[value as keyof typeof SHORT_CUT_KEY]
              })`}
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
      <Button variant={'destructive'} onClick={handleDelteAll}>
        Clear Canvas
      </Button>
      <CanvasDom ref={canvas} mode={value.field?.mode} />
      <div className='text-xs text-slate-400 grid gap-2'>
        <div>Keyboard Short Cut:</div>
        <div className='grid grid-cols-[24px_1fr] gap-y-1'>
          <div>{`⌘${SHORT_CUT_KEY.highlight}`}</div>
          <div>highlight</div>
        </div>
      </div>
    </div>
  );
};

export default MngCanvasForm;
