'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import PageSwitch from '@/features/pageState/components/PageSwitch';
import {
  fetchPageStateByUid,
  updatePageStateIsOpen,
} from '@/features/pageState/services/client';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';

type Props = {};

type FormProps = {
  uid: string;
  isOpen: boolean;
  pageState: string;
};

const INITIAL_STATE: FormProps = {
  uid: '',
  isOpen: false,
  pageState: 'blank',
};

const RealtimeModal = ({}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // initialize
  useEffect(() => {
    (async () => {
      const supabase = createSupabaseClientComponentClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setValue(INITIAL_STATE);
        return;
      }

      const pageState = await fetchPageStateByUid(user.id);
      if (!pageState) {
        setValue(INITIAL_STATE);
        return;
      }

      setValue((prev) => ({
        ...prev,
        uid: user.id,
        isOpen: pageState.isOpen!,
        pageState: pageState.pageState!,
      }));
    })();
  }, []);

  // subscibe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('watch opens')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'page_states' },
        (payload) => {
          const updated = payload.new;
          const { uid, isOpen, pageState } = updated;
          if (value.uid === uid) {
            setValue((prev) => ({ ...prev, isOpen, pageState }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [value]);

  const handleClose = async () => {
    // local
    setValue((prev) => ({ ...prev, isOpen: false }));
    // remote
    updatePageStateIsOpen(value.uid, false);
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
        <PageSwitch pageState={value.pageState} />
      </DialogContent>
    </Dialog>
  );
};

export default RealtimeModal;
