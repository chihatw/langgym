'use client';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useState } from 'react';
import { MIRROR_REALTIME_ITEMS } from '../../constants';
import { MirrorWorkoutRealtime } from '../../schema';
import MirrorWorkoutRealtimeRow from '../MirrorWorkoutRealtimeRow';

type Props = {
  params: MirrorWorkoutRealtime;
};

type FormProps = Omit<MirrorWorkoutRealtime, 'id'>;

const INITIAL_STATE: FormProps = {
  selectedId: '0',
  isMirror: false,
};

const MirrorWorkoutRealtimeForm = ({ params }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // initialize
  useEffect(() => {
    setValue((prev) => ({ ...prev, ...params }));
  }, [params]);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();

    const channel = supabase
      .channel(`mirror ${nanoid()}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'mirror_workout_realtime' },
        (preload) => {
          const updated = preload.new;
          const { selectedId, isMirror } = updated;
          setValue((prev) => ({ ...prev, selectedId, isMirror }));
        }
      )
      .subscribe((state) => {
        console.log(state);
      });
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const selectedItem = useMemo(() => {
    return MIRROR_REALTIME_ITEMS.find((item) => item.id === value.selectedId);
  }, [value]);

  return (
    <div className='mx-auto max-w-md grid gap-4 pt-10 '>
      {selectedItem ? (
        <div className='grid gap-4'>
          <MirrorWorkoutRealtimeRow
            label={selectedItem.item_1}
            toggle={value.isMirror}
            highlights={selectedItem.highlights}
            back={selectedItem.item_back}
            highlights_back={selectedItem.highlights_back}
          />
          {selectedItem.item_2 ? (
            <MirrorWorkoutRealtimeRow
              label={selectedItem.item_2}
              toggle={value.isMirror}
              highlights={selectedItem.highlights}
              back=''
              highlights_back={[]}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default MirrorWorkoutRealtimeForm;
