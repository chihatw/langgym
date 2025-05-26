import Link from 'next/link';

import AuthPane from '@/features/auth/components/AuthPane';
import { getUserFromServerSide } from '@/features/auth/services/server';
import { Home } from 'lucide-react';
import { buttonVariants } from './ui/button';

const Header = async () => {
  const user = await getUserFromServerSide();

  return (
    <nav className='grid h-12 shadow-sm print:hidden '>
      <div className='flex items-center justify-between sm:mx-8 '>
        <Link
          href={'/'}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          <Home />
        </Link>
        <AuthPane user={user} />
      </div>
    </nav>
  );
};

export default Header;
