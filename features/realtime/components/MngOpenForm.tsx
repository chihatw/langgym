'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { PageStateView } from '@/features/pageState/schema';
import { updatePageStateIsOpen } from '@/features/pageState/services/client';
import { useEffect, useState } from 'react';

type Props = { pageStates: PageStateView[] };

type FormProps = {
  opens: { [uid: string]: boolean };
};

const INITIAL_STATE: FormProps = {
  opens: {},
};

const MngOpenForm = ({ pageStates }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    const _opens = pageStates.reduce((acc, cur) => {
      return { ...acc, [cur.uid!]: cur.isOpen! };
    }, {} as { [uid: string]: boolean });

    setValue((prev) => ({ ...prev, opens: _opens }));
  }, [pageStates]);

  const handleChange = async (uid: string, isOpen: boolean) => {
    // local
    setValue((prev) => ({
      ...prev,
      opens: {
        ...prev.opens,
        [uid]: isOpen,
      },
    }));
    // remote
    updatePageStateIsOpen(uid, isOpen);
  };

  return (
    <div className='grid gap-4'>
      <div className='text-xs font-extrabold'>Is Open</div>
      <div className='grid gap-4'>
        {pageStates.map((line, index) => (
          <div
            key={index}
            className='p-2 rounded bg-white/60 grid grid-cols-[48px,auto,auto,1fr] gap-2 items-center'
          >
            <div className='text-xs font-extrabold'>{line.display}</div>
            <Checkbox
              checked={value.opens[line.uid!]}
              onCheckedChange={(checked) =>
                handleChange(line.uid!, checked as boolean)
              }
            />
            <div className='text-xs'>is open</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MngOpenForm;
