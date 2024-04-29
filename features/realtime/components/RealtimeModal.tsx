'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import PageSwitch from '@/features/pageState/components/PageSwitch';
import { SpeedWorkout } from '@/features/speedWorkout/schema';
import { WorkoutItemView } from '@/features/workout/schema';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { updateOpenIsOpen } from '../services/client';

type Props = {
  uid: string;
  isOpen: boolean;
  pageState: string;
  workoutItems: WorkoutItemView[];
  speedWorkout: SpeedWorkout | undefined;
};

type FormProps = {
  isOpen: boolean;
};

const INITIAL_STATE: FormProps = {
  isOpen: false,
};

const RealtimeModal = ({
  uid,
  isOpen,
  pageState,
  workoutItems,
  speedWorkout,
}: Props) => {
  const [value, setValue] = useState({ ...INITIAL_STATE, isOpen });

  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('watch opens')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'opens' },
        (payload) => {
          const updated = payload.new;
          const { uid: _uid, isOpen } = updated;
          if (uid === _uid) {
            setValue((prev) => ({ ...prev, isOpen }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [uid]);

  const handleClose = async () => {
    // local
    setValue((prev) => ({ ...prev, isOpen: false }));
    // remote
    updateOpenIsOpen(uid, false);
  };

  return (
    <Dialog
      open={value.isOpen}
      onOpenChange={(isOpen) => {
        if (isOpen) return;
        handleClose();
      }}
    >
      <DialogContent className='min-w-full h-screen bg-slate-200 overflow-scroll'>
        <PageSwitch
          uid={uid}
          pageState={pageState}
          speedWorkout={speedWorkout}
          workoutItems={workoutItems}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RealtimeModal;
