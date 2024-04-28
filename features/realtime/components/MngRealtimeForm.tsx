'use client';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { PAGES } from '@/features/pageState/constants';
import { PageStateView } from '@/features/pageState/schema';
import { updatePageState } from '@/features/pageState/services/client';
import { useEffect, useState } from 'react';

type Props = {
  pageStates: PageStateView[];
};

type FormProps = {
  pageStates: { [uid: string]: string };
};

const INITIAL_STATE: FormProps = {
  pageStates: {},
};

const MngRealtimeForm = ({ pageStates }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    const _pageStates: { [uid: string]: string } = pageStates.reduce(
      (acc, cur) => {
        return {
          ...acc,
          [cur.uid!]: cur.pageState!,
        };
      },
      {} as { [uid: string]: string }
    );
    setValue((prev) => ({ ...prev, pageStates: _pageStates }));
  }, [pageStates]);

  const handleChange = async (uid: string, pageState: string) => {
    // local
    setValue((prev) => ({
      ...prev,
      pageStates: {
        ...prev.pageStates,
        [uid]: pageState,
      },
    }));
    // remote
    updatePageState(uid, pageState);
  };

  return (
    <div className='grid gap-4'>
      {pageStates.map((line, index) => (
        <div key={index} className='p-2 rounded bg-white/60 grid gap-2 '>
          <div className='text-xs font-extrabold'>{line.display}</div>

          <RadioGroup
            className='flex flex-wrap gap-2'
            value={value.pageStates[line.uid!]}
            onValueChange={(value) => handleChange(line.uid!, value)}
          >
            {Object.entries(PAGES).map(([key, value], index) => (
              <div key={index} className='flex items-center gap-1'>
                <RadioGroupItem value={key} />
                <Label>{value}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default MngRealtimeForm;
