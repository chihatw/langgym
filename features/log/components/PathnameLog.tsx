'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

type Props = { uid: string | null };

const PathnameLog = ({ uid }: Props) => {
  const pathname = usePathname();

  useEffect(() => {
    // debug
    // insertPathnameLog(uid, pathname);

    return () => {
      // debug
      // updatePathnameLog(uid, pathname);
    };
  }, [pathname, uid]);

  return null;
};

export default PathnameLog;
