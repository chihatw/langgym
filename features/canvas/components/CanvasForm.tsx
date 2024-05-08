import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useRef } from 'react';
import { Box } from '../class/Box';
import { Field } from '../class/Field';
import { RECT } from '../constants';
import { fetchCanvas } from '../services/client';
import CanvasDom from './CanvasDom';

type Props = {};

type RefProps = {
  box: Box;
  field: Field;
};

const INITIAL_REF: RefProps = {
  box: new Box('', 'green'),
  field: new Field(RECT.width, RECT.height),
};

const CanvasForm = (props: Props) => {
  const ref = useRef(INITIAL_REF);

  const canvas = useRef<HTMLCanvasElement>(null);

  // initialize
  useEffect(() => {
    (async () => {
      const data = await fetchCanvas();
      if (!data) return;

      const { field, box } = ref.current;
      const { label, x, y, color } = data;

      // Set Canvas
      field.setCanvas(canvas.current!);
      field.add(box);
      field.start();

      box.setDataFromRemote(x, y, label, color);
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
          event: 'UPDATE',
          schema: 'public',
          table: 'canvas',
          filter: `id=eq.1`,
        },
        (preload) => {
          const { box } = ref.current;

          const updated = preload.new;
          const { x, y, label, color } = updated;

          box.setDataFromRemote(x, y, label, color);
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
