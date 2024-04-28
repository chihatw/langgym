'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { Open } from '../schema';
import { updateOpenIsOpen } from '../services/client';

type Props = { opens: Open[] };

type FormProps = {
  opens: { [uid: string]: boolean };
};

const INITIAL_STATE: FormProps = {
  opens: {},
};

const MngOpenForm = ({ opens }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    const _opens = opens.reduce((acc, cur) => {
      return { ...acc, [cur.uid!]: cur.isOpen! };
    }, {} as { [uid: string]: boolean });

    setValue((prev) => ({ ...prev, opens: _opens }));
  }, [opens]);

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
    updateOpenIsOpen(uid, isOpen);
  };

  return (
    <div className='grid gap-4'>
      <div className='text-xs font-extrabold'>Is Open</div>
      <div className='grid gap-4'>
        {opens.map((line, index) => (
          <div
            key={index}
            className='p-2 rounded bg-white/60 grid grid-cols-[36px,auto,auto,1fr] gap-2 items-center'
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
