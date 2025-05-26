'use client';

import MngPaneContainer from '@/components/MngPaneContainer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RefreshCcw } from 'lucide-react';
import { Lato } from 'next/font/google';
import { useState } from 'react';
import {
  MIRROR_REALTIME_ITEMS,
  MIRROR_WORKOUT_REALTIME_ID,
} from '../../constants';
import { MirrorWorkoutRealtime } from '../../schema';
import { updateMirrorWorkoutRealtime } from '../../services/client';
import MirrorWorkoutRealtimeRow from '../MirrorWorkoutRealtimeRow';

const lato = Lato({ subsets: ['latin'], weight: '900' });

type Props = {};

type FormProps = Omit<MirrorWorkoutRealtime, 'id'>;

const INITIAL_STATE: FormProps = {
  selectedId: '0',
  isMirror: true,
};

const MngMirrorForm = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const handleClickIsMirror = () => {
    const updated: FormProps = { ...value, isMirror: !value.isMirror };
    setValue(updated);

    // remote
    updateMirrorWorkoutRealtime({ ...updated, id: MIRROR_WORKOUT_REALTIME_ID });
  };

  const handleChangeIndex = (id: string) => {
    const updated: FormProps = { ...value, selectedId: id };
    setValue(updated);

    // remote
    updateMirrorWorkoutRealtime({ ...updated, id: MIRROR_WORKOUT_REALTIME_ID });
  };
  return (
    <MngPaneContainer label='Mirror'>
      <div className='grid gap-4'>
        {MIRROR_REALTIME_ITEMS.map((item, index) => (
          <div
            key={index}
            className='grid grid-cols-[40px_1fr_40px] items-center p-0 border-b border-slate-500 pb-4 gap-2'
          >
            <Checkbox
              checked={value.selectedId === item.id}
              onCheckedChange={() => handleChangeIndex(item.id)}
            />
            <div className='grid gap-4'>
              <MirrorWorkoutRealtimeRow
                label={item.item_1}
                toggle={value.isMirror}
                highlights={item.highlights}
                back={item.item_back}
                highlights_back={item.highlights_back}
              />
              {item.item_2 ? (
                <MirrorWorkoutRealtimeRow
                  label={item.item_2}
                  toggle={value.isMirror}
                  highlights={item.highlights}
                  back=''
                  highlights_back={[]}
                />
              ) : null}
            </div>
            <Button size={'icon'} onClick={handleClickIsMirror}>
              <RefreshCcw className='h-5 w-5' />
            </Button>
          </div>
        ))}
      </div>
    </MngPaneContainer>
  );
};

export default MngMirrorForm;
