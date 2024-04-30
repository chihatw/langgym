'use client';

import { buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PitchTable_A from '@/features/pitchTable/components/PitchTable_A';
import PitchTable_B from '@/features/pitchTable/components/PitchTable_B';

import { TabsContent } from '@radix-ui/react-tabs';
import { useState } from 'react';

type PitcTableType = 'a' | 'b';

const PitchTableTabs = ({
  lines,
}: {
  lines: {
    japanese: string;
    pitchStr: string;
    chinese: string;
  }[];
}) => {
  const [value, setValue] = useState({ type: 'a' });

  return (
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
  );
};

export default PitchTableTabs;
