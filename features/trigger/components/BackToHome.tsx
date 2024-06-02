'use client';

import { fetchUserByUid } from '@/features/user/services/client';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { REMOTE_TRIGGER_ID } from '../constants';

type Props = {
  uid: string;
};

const BackToHome = ({ uid }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel(`back to home ${nanoid()}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'remote_trigger',
          filter: `id=eq.${REMOTE_TRIGGER_ID.back_to_home}`,
        },
        () => {
          (async () => {
            const user = await fetchUserByUid(uid);
            if (user?.realtime) {
              console.log('back to home');
              router.push('/');
            }
          })();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, uid]);
  return null;
};

export default BackToHome;
