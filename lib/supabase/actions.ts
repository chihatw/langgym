import { Database } from '@/types/supabase';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

import { cookies } from 'next/headers';

export async function createSupabaseServerActionClient(
  serverComponent = false
) {
  const cookieStore = await cookies();
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          if (serverComponent) return;
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          if (serverComponent) return;
          cookieStore.set({ name, value: '', ...options });
        },
      },
    }
  );
}

export function createSupabaseServerComponentClient() {
  return createSupabaseServerActionClient(true);
}
