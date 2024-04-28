'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { updateOpenIsOpen } from '../services/client';

type Props = {
  uid: string;
  isOpen: boolean;
};

type FormProps = {
  isOpen: boolean;
};

const INITIAL_STATE: FormProps = {
  isOpen: false,
};

const RealtimeModal = ({ uid, isOpen }: Props) => {
  const [value, setValue] = useState({ ...INITIAL_STATE, isOpen });

  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    supabase
      .channel('watch opens')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'opens' },
        (payload) => {
          const newRecord = payload.new;
          const { uid: _uid, isOpen } = newRecord;
          if (uid === _uid) {
            setValue((prev) => ({ ...prev, isOpen }));
          }
        }
      )
      .subscribe();
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
        hello
      </DialogContent>
    </Dialog>
  );
};

export default RealtimeModal;
