'use client';

import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { fetchPageStateByUid } from '../services/client';
import PageSwitch from './PageSwitch';

type Props = { uid: string };

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

const PageSwitchLoader = ({ uid }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // initialize
  useEffect(() => {
    (async () => {
      const pageState = await fetchPageStateByUid(uid);
      if (!pageState) {
        setValue(INITIAL_STATE);
        return;
      }

      setValue((prev) => ({
        ...prev,
        uid,
        isOpen: pageState.isOpen!,
        pageState: pageState.pageState!,
      }));
    })();
  }, [uid]);

  // subscibe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('page states realtime modal')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'page_states',
          filter: `uid=eq.${uid}`,
        },
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
  }, [value, uid]);

  return <PageSwitch pageState={value.pageState} />;
};

export default PageSwitchLoader;
