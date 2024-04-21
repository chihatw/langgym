import { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/button';

import { WorkoutSecondFormProps } from './WorkoutSecondPane';
import WorkoutSecondRow from './WorkoutSecondRow';

type Props = {
  value: WorkoutSecondFormProps;
  setValue: Dispatch<SetStateAction<WorkoutSecondFormProps>>;
};

const WorkoutSecondPrepare = ({ value, setValue }: Props) => {
  return (
    <div className='grid gap-0'>
      <div className='pl-4 pb-4'>
        <Button
          variant={'link'}
          className='p-0 m-0'
          onClick={() => setValue((prev) => ({ ...prev, state: 'record' }))}
        >
          次へ
        </Button>
      </div>
      <div className='mx-4 text-sm text-slate-700 pb-8'>
        <div className='mb-4 '>中国語を見て、日本語を発音する練習です</div>
        <div className='text-xs text-slate-500'>
          <div>・カードを覚えて 次のページに 進んでください</div>
          <div>
            ・次のページでは カードの中国語を 1枚ずつ ランダムな順番で表示します
          </div>
          <div>・中国語を見て 対応する日本語を 正しく発音してください</div>
          <div>・録音はやり直しできます</div>
        </div>
      </div>
      <div className='grid gap-4 mb-8'>
        {value.items.map((item, index) => (
          <WorkoutSecondRow key={index} index={index} item={item} />
        ))}
      </div>
      <Button
        onClick={() => setValue((prev) => ({ ...prev, state: 'record' }))}
      >
        次へ
      </Button>
    </div>
  );
};

export default WorkoutSecondPrepare;
