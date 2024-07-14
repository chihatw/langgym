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
      .channel(`redirect to ${nanoid()}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'redirect_tos',
          filter: `uid=eq.${uid}`,
        },
        (preload) => {
          const updated = preload.new;
          const { redirect_to } = updated;
          router.push(redirect_to);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return null;
};

export default RedirectController;
