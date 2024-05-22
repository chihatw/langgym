import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { useEffect, useRef } from 'react';
import { Box } from '../class/Box';
import { Field } from '../class/Field';
import { RECT } from '../constants';
import { fetchBoxes } from '../services/client';
import CanvasDom from './CanvasDom';

type Props = {};

type RefProps = {
  initializing: boolean;
  field: Field | null;
};

const INITIAL_REF: RefProps = {
  initializing: true,
  field: null,
};

const CanvasForm = (props: Props) => {
  const ref = useRef(INITIAL_REF);

  const canvas = useRef<HTMLCanvasElement>(null);

  // initialize
  useEffect(() => {
    if (!ref.current.initializing) return;

    (async () => {
      if (!canvas.current) throw new Error();

      const field = new Field(RECT.width, RECT.height, canvas.current);
      ref.current = { field, initializing: false };

      const _boxes = await fetchBoxes();
      console.log(`initial fetch ${_boxes.length} boxes`);
      const boxes: Box[] = [];
      for (const _box of _boxes) {
        const { label, x, y, id, splitBy, highlights } = _box;
        const box = new Box(x, y, label, splitBy, highlights, false, id);
        boxes.push(box);
      }
      field.objs = boxes;
      field.loop();
    })();
  }, []);

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

          const { field } = ref.current;
          if (!field) throw new Error();

          console.log(`add box`);
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
          const { field } = ref.current;
          if (!field) throw new Error();
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
          const { field } = ref.current;
          if (!field) throw new Error();
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
          const { expandObjId, expandStartObjId } = updated;

          const { field } = ref.current;
          if (!field) throw new Error();

          field.expandObjId = expandObjId || null;
          field.expandStartObjId = expandStartObjId || null;
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // todo subscribe  canvas connected obj sets

  return (
    <div className='grid gap-4 justify-center pt-8'>
      <CanvasDom ref={canvas} />
    </div>
  );
};

export default CanvasForm;
