'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTransition } from 'react';
import { BetterReadView } from '../../schema';
import { updateBetterreadToggleBetterreadId } from '../../services/actions';

type Props = {
  selectedId: string;
  betterreads: BetterReadView[];
  handleValueChange: (value: string) => void;
};

const SelectBetterread = ({
  selectedId,
  betterreads,
  handleValueChange,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const action = async () => {
    startTransition(() => {
      updateBetterreadToggleBetterreadId(parseInt(selectedId));
    });
  };

  return (
    <div className='grid gap-4'>
      <Select value={selectedId} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder='betterread' />
        </SelectTrigger>
        <SelectContent>
          {betterreads.map((betterread) => (
            <SelectItem
              key={betterread.id}
              value={betterread.id!.toString()}
            >{`${betterread.title}`}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <SubmitServerActionButton
        isPending={isPending}
        disabled={!selectedId || isPending}
        action={action}
      >
        同期
      </SubmitServerActionButton>
    </div>
  );
};

export default SelectBetterread;
