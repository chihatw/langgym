'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { insertPathnameLog } from '../services/client';

type Props = { uid: string | null };

const PathnameLog = ({ uid }: Props) => {
  const pathname = usePathname();
  const initializing = useRef(true);
  useEffect(() => {
    if (!initializing.current) return;
    insertPathnameLog(uid, pathname);
    initializing.current = false;
  }, [pathname, uid]);

  return null;
};

export default PathnameLog;
