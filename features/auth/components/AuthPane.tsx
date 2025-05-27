import { Button, buttonVariants } from '@/components/ui/button';
import { DoorClosed, DoorOpen } from 'lucide-react';
import Link from 'next/link';
import { signOut } from '../services/actions';

type Props = {
  hasUser: boolean;
};

const AuthPane = ({ hasUser }: Props) => {
  return (
    <div className='flex items-center gap-x-2'>
      {hasUser ? (
        <form action={signOut}>
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
  );
};

export default AuthPane;
