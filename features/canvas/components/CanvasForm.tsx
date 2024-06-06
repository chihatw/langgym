'use client';

import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { MutableRefObject, useEffect, useRef } from 'react';
import { Box } from '../class/Box';
import { Field } from '../class/Field';
import { RECT } from '../constants';
import { fetchBoxes, fetchField } from '../services/client';
import { connectedObjSetsParse } from '../services/utils';
import CanvasDom from './CanvasDom';

type Props = {};

type RefProps = {
  field: Field | null;
};

const INITIAL_REF: RefProps = {
  field: null,
};

const CanvasForm = (props: Props) => {
  const ref = useRef(INITIAL_REF);

  const canvas = useRef<HTMLCanvasElement>(null);

  // initialize
  useEffect(() => {
    // field は 重複作成しない
    if (!!ref.current.field) return;

    (async () => {
      if (!canvas.current) throw new Error();

      const _field = await fetchField();
      if (!_field) return;

      const field = createFieldRef(ref, canvas.current);
      field.connectedObjSets = connectedObjSetsParse(_field.connectedObjSets);
      field.expandObjId = _field.expandObjId;
      field.expandStartObjId = _field.expandStartObjId;

      const _boxes = await fetchBoxes();
      console.log(`initial fetch ${_boxes.length} boxes`);
      const boxes: Box[] = [];
      for (const _box of _boxes) {
        const { label, x, y, id, splitBy, highlights } = _box;
        const box = new Box(x, y, label, splitBy, highlights, false, id);
        boxes.push(box);
      }
      field.objs = boxes;
    })();
  }, []);

  // TODO canvas の状態を１つの文字列だけで伝える
  // subscribe canvas

  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel(`canvas form ${nanoid()}`)

      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'canvas_boxes',
        },
        (preload) => {
          console.log('insert box');

          const inserted = preload.new;
          const { x, y, label, id, splitBy, highlights, isHidden } = inserted;
          const box = new Box(x, y, label, splitBy, highlights, isHidden, id);

          if (!canvas.current) throw new Error();
          const field = createFieldRef(ref, canvas.current);

          field.objs = [...field.objs, box];
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'canvas_boxes',
        },
        (preload) => {
          console.log('delete box');
          // delete が発火しない解決法 ALTER TABLE your_table REPLICA IDENTITY FULL
          // https://github.com/supabase/supabase/issues/4905
          const { id } = preload.old;

          if (!canvas.current) throw new Error();
          const field = createFieldRef(ref, canvas.current);
          field.objs = field.objs.filter((obj) => obj.id !== id);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'canvas_boxes',
        },
        (preload) => {
          console.log('update box');
          const updated = preload.new;
          const { x, y, label, id, splitBy, highlights, isHidden } = updated;

          if (!canvas.current) throw new Error();
          const field = createFieldRef(ref, canvas.current);

          const newBox = new Box(
            x,
            y,
            label,
            splitBy,
            highlights,
            isHidden,
            id
          );
          // objs に含まれていない場合、追加
          if (!field.objs.find((o) => o.id === id)) {
            field.objs = [...field.objs, newBox];
            return;
          }

          // 含まれている場合、変更
          field.objs = field.objs.map((obj) => (obj.id !== id ? obj : newBox));
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'canvas_field' },
        (preload) => {
          console.log('update field');
          const updated = preload.new;
          const { expandObjId, expandStartObjId, connectedObjSets } = updated;

          if (!canvas.current) throw new Error();
          const field = createFieldRef(ref, canvas.current);

          field.expandObjId = expandObjId || null;
          field.expandStartObjId = expandStartObjId || null;
          field.connectedObjSets = connectedObjSetsParse(connectedObjSets);
        }
      )
      .subscribe((status, error) => {
        console.log(status);
        if (error) {
          console.log(error.message);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className='grid gap-4 justify-center pt-8'>
      <CanvasDom ref={canvas} />
    </div>
  );
};

export default CanvasForm;

function createFieldRef(
  ref: MutableRefObject<RefProps>,
  canvas: HTMLCanvasElement
) {
  console.log(ref.current.field);
  if (ref.current.field) return ref.current.field;

  const field = new Field(RECT.width, RECT.height, canvas);
  field.start();

  ref.current = { ...ref.current, field };
  return field;
}
