'use client';

import { PathnameLogView } from '@/features/pathnameLog/schema';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

type Props = {
  pathnameLog: PathnameLogView | undefined;
};

type FormProps = {
  pathnameLog: PathnameLogView;
};

const INITIAL_STATE: FormProps = {
  pathnameLog: {
    uid: null,
    display: null,
    pathname: null,
    created_at: null,
  },
};

const PathnameLog = ({ pathnameLog }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // set values from RSC
  useEffect(() => {
    if (!pathnameLog) return;
    setValue((prev) => ({ ...prev, pathnameLog }));
  }, [pathnameLog]);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel(`pathnameLog ${nanoid()}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'pathname_logs',
          filter: `uid=eq.${pathnameLog?.uid}`,
        },
        (preload) => {
          if (!pathnameLog) return;
          const inserted = preload.new;
          const { pathname, created_at } = inserted;
          const new_pathnameLog: PathnameLogView = {
            ...pathnameLog,
            pathname,
            created_at: new Date(created_at),
          };
          setValue((prev) => ({ ...prev, pathnameLog: new_pathnameLog }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [pathnameLog]);

  if (!value.pathnameLog.pathname || !value.pathnameLog.created_at) return null;

  return (
    <div className='flex justify-end gap-2 text-xs items-center'>
      <div>{value.pathnameLog.pathname}</div>
      <div>{value.pathnameLog.created_at!.toLocaleTimeString()}</div>
    </div>
  );
};

export default PathnameLog;
