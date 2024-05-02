'use client';

import { FolderClosed, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

type Props = {
  label: string;
  children: React.ReactNode;
};

const MngPaneContainer = ({ label, children }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className='grid gap-4'>
      <div>
        <Button
          onClick={() => setOpen((prev) => !prev)}
          variant={'ghost'}
          className='text-xs font-extrabold justify-start items-center gap-2 px-2 py-0 m-0 h-auto'
        >
          {open ? <FolderOpen /> : <FolderClosed />}
          <div>{label}</div>
        </Button>
      </div>
      {open ? <div>{children}</div> : null}
    </div>
  );
};

export default MngPaneContainer;
