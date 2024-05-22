'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { useMemo } from 'react';
import { MngOpenFormProps } from './MngOpenForm';

type Props = {
  index: number;
  value: MngOpenFormProps;
  handleChange: (uid: string, isOpen: boolean) => void;
};

const MngOpenFormRow = ({ index, value, handleChange }: Props) => {
  const line = useMemo(() => {
    return value.pageStates.at(index);
  }, [value, index]);

  const pathnameLog = useMemo(() => {
    if (!line) return;
    return value.pathnameLogs.find((log) => log.uid === line.uid);
  }, [value, line]);

  if (!line) return null;
  return (
    <div className='p-2 rounded bg-white/60 grid grid-cols-[48px,auto,auto,1fr] gap-2 items-center'>
      <div className='text-xs font-extrabold'>{line.display}</div>
      <Checkbox
        checked={line.isOpen!}
        onCheckedChange={(checked) =>
          handleChange(line.uid!, checked as boolean)
        }
      />
      <div className='text-xs '>is open</div>
      {pathnameLog ? (
        <div className='flex justify-end gap-2 text-xs items-center'>
          <div>{pathnameLog.pathname}</div>
          <div>{pathnameLog.created_at!.toLocaleTimeString()}</div>
        </div>
      ) : null}
    </div>
  );
};

export default MngOpenFormRow;
