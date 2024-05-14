import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useRef } from 'react';
import { Box } from '../class/Box';
import { Field } from '../class/Field';
import { BG_COLOR, RECT } from '../constants';
import { fetchCanvas } from '../services/client';
import CanvasDom from './CanvasDom';

type Props = {};

type RefProps = {
  box: Box | null;
  field: Field | null;
};

const INITIAL_REF: RefProps = {
  box: null, // box も field の中に隠蔽する
  field: null,
};

const CanvasForm = (props: Props) => {
  const ref = useRef(INITIAL_REF);

  const canvas = useRef<HTMLCanvasElement>(null);

  // initialize
  useEffect(() => {
    (async () => {
      if (!canvas.current) return;
      const data = await fetchCanvas();
      if (!data) return;

      const { label, x, y } = data;

      const field = new Field(RECT.width, RECT.height, canvas.current);
      const box = new Box(x, y, label, BG_COLOR);

      ref.current = { field, box };

      field.add(box);
      field.start();
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
          const updated = preload.new;
          const { x, y, label } = updated;

          const { field } = ref.current;
          if (!canvas.current || !field) return;

          const box = new Box(x, y, label, BG_COLOR);
          ref.current = { ...ref.current, box };

          field.removeChildren();
          field.add(box);
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
