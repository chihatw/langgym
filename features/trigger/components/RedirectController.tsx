'use client';

import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = { uid: string };

const RedirectController = ({ uid }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel(`redirect controller ${nanoid()}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `uid=eq.${uid}`,
        },
        (preload) => {
          const updated = preload.new;
          const { realtime, redirectTo } = updated;
          // realtime が false ならば終了
          if (!realtime) return;
          router.push(redirectTo);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [uid]);
  return null;
};

export default RedirectController;
