import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useRef, useState } from 'react';
import { RECT_SIZE } from '../constants';
import { fetchCanvas } from '../services/client';

type Props = {};

type FormProps = {
  xPos: number;
  yPos: number;
};

const INITIAL_STATE: FormProps = {
  xPos: 0,
  yPos: 0,
};

const CanvasForm = (props: Props) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [value, setValue] = useState(INITIAL_STATE);

  // initialize
  useEffect(() => {
    (async () => {
      const canvas = await fetchCanvas();
      if (!canvas) {
        setValue(INITIAL_STATE);
        return;
      }
      setValue((prev) => ({ ...prev, ...canvas }));
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
          const { xPos, yPos } = updated;
          setValue((prev) => ({ ...prev, xPos, yPos }));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 点の描画
  useEffect(() => {
    if (!canvas.current) return;
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.fillStyle = 'rgb(200,0,0)';
    ctx.fillRect(
      value.xPos - RECT_SIZE / 2,
      value.yPos - RECT_SIZE / 2,
      RECT_SIZE,
      RECT_SIZE
    );
  }, [value]);

  return (
    <div className='grid gap-4 justify-center'>
      <pre>{JSON.stringify(value, null, 2)}</pre>
      <canvas
        ref={canvas}
        width={512}
        height={320}
        className='bg-white'
      ></canvas>
    </div>
  );
};

export default CanvasForm;
