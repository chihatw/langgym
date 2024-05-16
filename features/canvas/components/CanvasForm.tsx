import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useRef } from 'react';
import { Box } from '../class/Box';
import { Field } from '../class/Field';
import { Line } from '../class/Line';
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
        const { label, x, y, id, splitBy, highlights } = _box;
        const box = new Box(x, y, label, splitBy, highlights, id);
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
      .channel('canvas form')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'canvas',
        },
        (preload) => {
          console.log('insert box');
          const inserted = preload.new;
          const { x, y, label, id, splitBy, highlights } = inserted;

          const { field } = ref.current;
          if (!field) throw new Error();

          field.objs = [
            ...field.objs,
            new Box(x, y, label, splitBy, highlights, id),
          ];
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
          console.log('update box');
          const updated = preload.new;
          const { x, y, label, id, splitBy, highlights } = updated;

          const { field } = ref.current;
          if (!field) throw new Error();

          const newBox = new Box(x, y, label, splitBy, highlights, id);

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
        {
          event: 'DELETE',
          schema: 'public',
          table: 'canvas',
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
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // subscribe  canvas lines
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('canvas lines')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'canvas_lines',
        },
        (preload) => {
          console.log('insert line');
          const inserted = preload.new;
          const {
            id,
            startX,
            startY,
            endX,
            endY,
            startObjId,
            startCharIndex,
            endObjId,
            endCharIndex,
          } = inserted;

          const { field } = ref.current;
          if (!field) throw new Error();

          const line = new Line(
            startX,
            startY,
            endX,
            endY,
            startObjId,
            startCharIndex,
            endObjId,
            endCharIndex,
            id
          );

          // endObjId がない場合、drawingLine に設定
          if (!endObjId) {
            field.drawingLine = line;
            return;
          }

          // endObjId がある場合、connectedLines に追加
          field.connectedLines = [...field.connectedLines, line];
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'canvas_lines',
        },
        (preload) => {
          console.log('update line');
          const updated = preload.new;

          const {
            id,
            startX,
            startY,
            endX,
            endY,
            startObjId,
            startCharIndex,
            endObjId,
            endCharIndex,
          } = updated;

          const { field } = ref.current;
          if (!field) throw new Error();

          const newLine = new Line(
            startX,
            startY,
            endX,
            endY,
            startObjId,
            startCharIndex,
            endObjId,
            endCharIndex,
            id
          );

          // endObjId がない場合、drawingLine に設定
          if (!endObjId) {
            field.drawingLine = newLine;
            return;
          }

          // endObjId がある場合、

          // connectedLines に含まれていない場合、追加
          if (!field.connectedLines.find((line) => line.id === id)) {
            field.connectedLines = [...field.connectedLines, newLine];
            return;
          }

          // connectedLines に含まれている場合、変更
          field.connectedLines = field.connectedLines.map((line) =>
            line.id !== id ? line : newLine
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'canvas_lines',
        },
        (preload) => {
          console.log('delete line');
          const { id } = preload.old;

          const { field } = ref.current;
          if (!field) throw new Error();

          if (field.drawingLine && field.drawingLine.id === id)
            field.drawingLine = null;

          field.connectedLines = field.connectedLines.filter(
            (line) => line.id !== id
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // subscribe canvas_all_delte
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('canvas all delete')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'canvas_all_delete' },
        () => {
          const { field } = ref.current;
          if (!field) throw new Error();
          field.objs = [];
          field.drawingLine = null;
          field.connectedLines = [];
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
