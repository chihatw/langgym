'use client';

import { buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { TabsContent } from '@radix-ui/react-tabs';
import { useMemo, useState } from 'react';
import { PitchTableLine } from '../schema';

type Props = {};

type PitcTableType = 'a' | 'b';

type FormProps = {
  input: string;
  type: PitcTableType;
};

const INITIAL_STATE: FormProps = {
  input: '',
  type: 'a',
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
      <Tabs
        value={value.type}
        onValueChange={(value) =>
          setValue((prev) => ({ ...prev, type: value as PitcTableType }))
        }
      >
        <TabsList className='w-full grid grid-cols-2 text-xs bg-slate-200'>
          <TabsTrigger value='a' className='text-xs'>
            中国語なし
          </TabsTrigger>
          <TabsTrigger value='b' className='text-xs'>
            中国語あり
          </TabsTrigger>
        </TabsList>
        <TabsContent value='a'>
          <div className='grid gap-4'>
            <div className='p-10 bg-white'>
              <PitchTable_A lines={lines} />
            </div>
            <Dialog>
              <DialogTrigger className='grid'>
                <div className={buttonVariants()}>Full Page</div>
              </DialogTrigger>
              <DialogContent className='min-w-full h-screen bg-white flex justify-center pt-10'>
                <div className='max-w-2xl flex-1'>
                  <PitchTable_A lines={lines} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
        <TabsContent value='b'>
          <div className='grid gap-4'>
            <div className='p-10 bg-white'>
              <PitchTable_B lines={lines} />
            </div>
            <Dialog>
              <DialogTrigger className='grid'>
                <div className={buttonVariants()}>Full Page</div>
              </DialogTrigger>
              <DialogContent className='min-w-full h-screen bg-white flex justify-center pt-10'>
                <div className='max-w-2xl flex-1'>
                  <PitchTable_B lines={lines} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PitchTableForm;

const PitchTable_A = ({ lines }: { lines: PitchTableLine[] }) => {
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

const PitchTable_B = ({ lines }: { lines: PitchTableLine[] }) => {
  return (
    <div className='grid gap-4'>
      {lines.map((line, index) => (
        <div key={index} className='grid items-center gap-1'>
          <div className='text-xs'>{`${index + 1}.`}</div>
          <div className='text-sm text-black'>{line.japanese}</div>
          <div className='text-xs text-black/50'>{line.chinese}</div>
          <SentencePitchLine pitchStr={line.pitchStr} />
        </div>
      ))}
    </div>
  );
};
