'use client';
import { Button } from '@/components/ui/button';
import { updateRemoteLoginTrigger } from '@/features/auth/services/client';
import { PageStateView } from '@/features/pageState/schema';
import { updatePageStateIsOpen } from '@/features/pageState/services/client';
import { PathnameLogView } from '@/features/pathnameLog/schema';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import MngOpenFormRow from './MngOpenFormRow';

type Props = { pageStates: PageStateView[]; pathnameLogs: PathnameLogView[] };

export type MngOpenFormProps = {
  pageStates: PageStateView[];
  pathnameLogs: PathnameLogView[];
};

const INITIAL_STATE: MngOpenFormProps = {
  pageStates: [],
  pathnameLogs: [],
};

const MngOpenForm = ({ pageStates, pathnameLogs }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    setValue((prev) => ({ ...prev, pageStates }));
  }, [pageStates]);

  // initialize
  useEffect(() => {
    setValue((prev) => ({ ...prev, pathnameLogs }));
  }, [pathnameLogs]);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('pathname logs')

      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'pathname_logs' },
        (preload) => {
          const updated = preload.new;
          const { uid, removed_at } = updated;
          setValue((prev) => {
            const target = prev.pathnameLogs.map((item) => {
              if (item.uid !== uid) {
                return item;
              }

              return {
                ...item,
                removed_at: new Date(removed_at),
              };
            });

            return {
              ...prev,
              pathnameLogs: target,
            };
          });
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'pathname_logs' },
        (preload) => {
          const { created_at, pathname, uid } = preload.new;
          setValue((prev) => {
            const target = prev.pathnameLogs.map((item) => {
              if (item.uid !== uid) {
                return item;
              }

              return {
                ...item,
                created_at: new Date(created_at),
                removed_at: null,
                pathname,
              };
            });

            return {
              ...prev,
              pathnameLogs: target,
            };
          });
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleChange = (uid: string, isOpen: boolean) => {
    // local
    setValue((prev) => {
      return {
        ...prev,
        pageStates: prev.pageStates.map((item) => {
          if (uid !== item.uid) {
            return item;
          }
          return { ...item, isOpen };
        }),
      };
    });
    // remote
    updatePageStateIsOpen(uid, isOpen);
  };

  const handleRemoteLogin = () => {
    updateRemoteLoginTrigger();
  };

  return (
    <div className='grid gap-4'>
      <div className='text-xs font-extrabold'>Is Open</div>
      <div>
        <Button
          className='h-auto w-auto p-0'
          variant={'ghost'}
          onClick={handleRemoteLogin}
        >
          Remote Log in
        </Button>
      </div>
      <div className='grid gap-4'>
        {value.pageStates.map((_, index) => (
          <MngOpenFormRow
            key={index}
            index={index}
            value={value}
            handleChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
};

export default MngOpenForm;
