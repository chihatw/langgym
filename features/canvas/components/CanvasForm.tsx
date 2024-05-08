import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useRef } from 'react';
import { Box } from '../class/Box';
import { Field } from '../class/Field';
import { fetchCanvas } from '../services/client';

type Props = {};

type RefProps = {
  initializing: boolean;
  box: Box;
  field: Field;
};

const INITIAL_REF: RefProps = {
  initializing: true,
  box: new Box('hello', 'pink'),
  field: new Field(),
};

const CanvasForm = (props: Props) => {
  const ref = useRef(INITIAL_REF);

  const canvas = useRef<HTMLCanvasElement>(null);

  // initialize
  useEffect(() => {
    (async () => {
      const { field, box } = ref.current;
      const data = await fetchCanvas();

      // Set Canvas
      field.setCanvas(canvas.current!);
      field.add(box);
      field.start();

      if (!data) return;

      box.pos = data;
      box.label = data.label;
      box.color = data.color;
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

          box.pos = { x, y };
          box.label = label;
          box.color = color;
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className='grid gap-4 justify-center'>
      <div className='w-[512px] h-[320px] overflow-hidden'>
        <canvas
          ref={canvas}
          width={512}
          height={320}
          className='bg-white origin-top-left'
        ></canvas>
      </div>
    </div>
  );
};

export default CanvasForm;
