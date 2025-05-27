'use client';

import { createClient } from '@/utils/supabase/client';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = { uid: string };

const RedirectController = ({ uid }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const supabase = createClient();
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
