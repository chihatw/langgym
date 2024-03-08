import Link from 'next/link';

import {
  createSupabaseServerActionClient,
  createSupabaseServerComponentClient,
} from '@/lib/supabase/actions';
import { DoorClosed, DoorOpen, Home } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Button, buttonVariants } from './ui/button';

const Header = async () => {
  // const router = useRouter();
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase.auth.getUser();

  const { user } = data;

  const action = async () => {
    'use server';
    const supabase = createSupabaseServerActionClient();
    await supabase.auth.signOut();
    redirect('/login');
  };

  return (
    <nav className='grid h-12 shadow'>
      <div className='container flex w-full items-center justify-between'>
        <Link
          href={'/'}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <Home />
        </Link>
        <div className='flex items-center gap-x-2'>
          {user ? (
            <form action={action}>
              <Button type='submit' variant={'ghost'} size={'icon'}>
                <DoorOpen />
              </Button>
            </form>
          ) : (
            <Link
              href={'/login'}
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
            >
              <DoorClosed />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
