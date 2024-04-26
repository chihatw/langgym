'use client';

import { buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { useMemo, useState } from 'react';
import { PitchTableLine } from '../schema';

type Props = {};

type FormProps = {
  input: string;
};

const INITIAL_STATE: FormProps = {
  input: '',
};

const PitchTableForm = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const lines = useMemo(() => {
    return value.input.split('\n').reduce((acc, cur, index) => {
      let last: PitchTableLine = {
        japanese: '',
        pitchStr: '',
        chinese: '',
      };
      switch (index % 3) {
        case 1:
          last = acc.pop()!;
          return [...acc, { ...last, pitchStr: cur }];
        case 2:
          last = acc.pop()!;
          return [...acc, { ...last, chinese: cur }];
        default:
          return [...acc, { japanese: cur, pitchStr: '', chinese: '' }];
      }
    }, [] as PitchTableLine[]);
  }, [value]);

  return (
    <div className='grid gap-8 '>
      <div className='text-2xl font-extrabold'>Pitch Table</div>
      <Textarea
        rows={10}
        value={value.input}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            input: e.target.value,
          }))
        }
      />

      <div className='p-10 bg-white'>
        <PitchTable lines={lines} />
      </div>
      <Dialog>
        <DialogTrigger className='grid'>
          <div className={buttonVariants()}>Full Page</div>
        </DialogTrigger>
        <DialogContent className='min-w-full h-screen bg-white flex justify-center pt-10'>
          <div className='max-w-2xl flex-1'>
            <PitchTable lines={lines} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PitchTableForm;

const PitchTable = ({ lines }: { lines: PitchTableLine[] }) => {
  return (
    <div className='grid'>
      {lines.map((line, index) => (
        <div
          key={index}
          className='h-12 grid grid-cols-[auto,1fr] items-center gap-x-2'
        >
          <div className='text-sm text-black'>{line.japanese}</div>
          <SentencePitchLine pitchStr={line.pitchStr} />
        </div>
      ))}
    </div>
  );
};
