import { Checkbox } from '@/components/ui/checkbox';
import { ReactNode } from 'react';

type Props = {};

const ITEMS = ['作文', 'アクセント問題', 'pdf upload', '反応練習', '課前準備'];

const MngChecklistForm = (props: Props) => {
  return (
    <div className='grid gap-4 max-w-md mx-auto '>
      <div className='text-2xl font-extrabold'>Check List</div>
      <div className='grid grid-cols-[120px_40px_40px]'>
        <RowGrids>
          <div></div>
          {ITEMS.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </RowGrids>
        <CheckListColumn label='李さん' items={ITEMS} />
        <CheckListColumn label='黄さん' items={ITEMS} />
      </div>
    </div>
  );
};

export default MngChecklistForm;

const RowGrids = ({ children }: { children: ReactNode }) => {
  return (
    <div className='grid grid-rows-[60px_40px_40px_40px_40px_40px] items-center text-sm justify-center'>
      {children}
    </div>
  );
};

const CheckListColumn = ({
  label,
  items,
}: {
  label: string;
  items: string[];
}) => {
  return (
    <RowGrids>
      <div className='[writing-mode:vertical-rl]'>{label}</div>
      {items.map((_, index) => (
        <div key={index} className='text-center'>
          <Checkbox />
        </div>
      ))}
    </RowGrids>
  );
};
