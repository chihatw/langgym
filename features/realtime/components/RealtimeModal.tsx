'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { BetterReadImagePathView } from '@/features/betterread/schema';
import PageSwitch from '@/features/pageState/components/PageSwitch';
import { PageStateView } from '@/features/pageState/schema';
import { updatePageStateIsOpen } from '@/features/pageState/services/client';
import { PaperCupParams } from '@/features/paperCup/schema';
import { SpeedWorkout } from '@/features/speedWorkout/schema';
import { WorkoutItemView } from '@/features/workout/schema';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';

type Props = {
  uid: string;
  pageState: PageStateView;
  workoutItems: WorkoutItemView[];
  speedWorkout: SpeedWorkout | undefined;
  paperCupParams: PaperCupParams | undefined;
  betterreadImagePaths: BetterReadImagePathView[];
};

type FormProps = {
  isOpen: boolean;
  pageState: string;
};

const INITIAL_STATE: FormProps = {
  isOpen: false,
  pageState: 'blank',
};

const RealtimeModal = ({
  uid,
  pageState,
  workoutItems,
  speedWorkout,
  paperCupParams,
  betterreadImagePaths,
}: Props) => {
  const [value, setValue] = useState({
    ...INITIAL_STATE,
    isOpen: pageState.isOpen,
  });

  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('watch opens')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'page_states' },
        (payload) => {
          const updated = payload.new;
          const { uid: _uid, isOpen, pageState } = updated;
          if (uid === _uid) {
            setValue((prev) => ({ ...prev, isOpen, pageState }));
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
    updatePageStateIsOpen(uid, false);
  };

  return (
    <Dialog
      open={value.isOpen!}
      onOpenChange={(isOpen) => {
        if (isOpen) return;
        handleClose();
      }}
    >
      <DialogContent className='min-w-full h-screen bg-slate-200 overflow-scroll pb-80 pt-20'>
        <PageSwitch
          pageState={value.pageState}
          speedWorkout={speedWorkout}
          workoutItems={workoutItems}
          paperCupParams={paperCupParams}
          betterreadImagePaths={betterreadImagePaths}
        />
      </DialogContent>
    </Dialog>
  );
};

export default RealtimeModal;
