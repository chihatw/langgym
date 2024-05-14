import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useRef } from 'react';
import { Box } from '../class/Box';
import { Field } from '../class/Field';
import { RECT } from '../constants';
import { fetchCanvas } from '../services/client';
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
    (async () => {
      if (!canvas.current) throw new Error();

      const field = new Field(RECT.width, RECT.height, canvas.current);
      ref.current = { field };

      const _boxes = await fetchCanvas();
      const boxes: Box[] = [];
      for (const _box of _boxes) {
        const { label, x, y, id, splitBy } = _box;
        const box = new Box(x, y, label, splitBy, id);
        boxes.push(box);
      }
      field.objs = boxes;
      field.loop();
    })();
  }, []);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('canvas form')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'canvas',
        },
        (preload) => {
          const inserted = preload.new;
          const { x, y, label, id, splitBy } = inserted;

          const { field } = ref.current;
          if (!canvas.current || !field) throw new Error();

          field.objs = [...field.objs, new Box(x, y, label, splitBy, id)];
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'canvas',
        },
        (preload) => {
          const updated = preload.new;
          const { x, y, label, id, splitBy } = updated;

          const { field } = ref.current;
          if (!canvas.current || !field) throw new Error();

          field.objs = field.objs.map((obj) => {
            if (obj.id !== id) {
              return obj;
            }
            return new Box(x, y, label, splitBy, id);
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'canvas',
        },
        (preload) => {
          const { id } = preload.old;

          const { field } = ref.current;
          if (!canvas.current || !field) throw new Error();

          field.objs = field.objs.filter((obj) => obj.id !== id);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className='grid gap-4 justify-center'>
      <CanvasDom ref={canvas} />
    </div>
  );
};

export default CanvasForm;
