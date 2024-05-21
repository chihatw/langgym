'use client';

import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { REMOTE_TRIGGER_ID } from '../constants';

type Props = {};

const BackToHome = (props: Props) => {
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
          console.log('back to home');
          router.push('/');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);
  return null;
};

export default BackToHome;
