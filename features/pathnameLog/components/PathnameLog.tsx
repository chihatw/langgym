'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { insertPathnameLog, updatePathnameLog } from '../services/client';

type Props = { uid: string | null };

const PathnameLog = ({ uid }: Props) => {
  const pathname = usePathname();

  useEffect(() => {
    insertPathnameLog(uid, pathname);

    return () => {
      updatePathnameLog(uid, pathname);
    };
  }, [pathname, uid]);

  return null;
};

export default PathnameLog;
