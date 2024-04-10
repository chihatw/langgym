import { Button, buttonVariants } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import { DoorClosed, DoorOpen, Settings } from 'lucide-react';
import Link from 'next/link';
import { signOut } from '../services/actions';

type Props = {
  user?: User;
};

const AuthPane = ({ user }: Props) => {
  return (
    <div className='flex items-center gap-x-2'>
      {user ? (
        <>
          {user.email === process.env.NEXT_PUBLIC_SUPABASE_ADMIN_EMAIL ? (
            <div>
              <Link
                href='/mng'
                className={buttonVariants({ variant: 'ghost', size: 'icon' })}
              >
                <Settings />
              </Link>
            </div>
          ) : null}
          <form action={signOut}>
            <Button type='submit' variant={'ghost'} size={'icon'}>
              <DoorOpen />
            </Button>
          </form>
        </>
      ) : (
        <Link
          href={'/login'}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <DoorClosed />
        </Link>
      )}
    </div>
  );
};

export default AuthPane;
