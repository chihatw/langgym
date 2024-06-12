'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { shuffle } from '@/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { MirrorWorkoutResult } from '../../schema';
import { convertTimezone_TW } from '../../services/utils';

type Props = {
  uid: string;
  cheat?: boolean;
  latestMirrorResult: MirrorWorkoutResult | undefined;
};

type FormProps = {
  hasTodaysResult: boolean;
  isGoodStudent: boolean;
  isBadStudent: boolean;
};

const INITIAL_STATE: FormProps = {
  hasTodaysResult: true,
  isGoodStudent: false,
  isBadStudent: false,
};

const MirrorDialog = ({ uid, cheat, latestMirrorResult }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const searchParams = useSearchParams();

  useEffect(() => {
    const isCheat = typeof searchParams.get('cheat') === 'string';
    setValue((prev) => ({ ...prev, cheat: isCheat }));
  }, []);

  useEffect(() => {
    const isCheat = typeof searchParams.get('cheat') === 'string';
    if (isCheat) return;

    if (!latestMirrorResult) {
      setValue((prev) => ({ ...prev, hasTodaysResult: false }));
      return;
    }

    const now_tw = convertTimezone_TW(new Date());
    const latest_created_at_tw = convertTimezone_TW(
      latestMirrorResult.created_at
    );
    const hasTodaysResult = now_tw.getDate() === latest_created_at_tw.getDate();

    setValue((prev) => ({ ...prev, hasTodaysResult }));
  }, [latestMirrorResult]);

  return (
    <Dialog open={!cheat && !value.hasTodaysResult}>
      <DialogContent>
        <DialogContentPane
          value={value}
          uid={uid}
          handleClickIsBad={() =>
            setValue((prev) => ({ ...prev, isBadStudent: true }))
          }
          handleClickIsGood={() =>
            setValue((prev) => ({ ...prev, isGoodStudent: true }))
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default MirrorDialog;

const DialogContentPane = ({
  uid,
  value: { isGoodStudent, isBadStudent },
  handleClickIsGood,
  handleClickIsBad,
}: {
  uid: string;
  value: FormProps;
  handleClickIsGood: () => void;
  handleClickIsBad: () => void;
}) => {
  const router = useRouter();
  if (isGoodStudent) {
    const icon = shuffle([
      '😆',
      '🥹',
      '🤩',
      '🥳',
      '😸',
      '🎃',
      '🤡',
      '💂🏻‍♀️',
      '👩🏻‍⚕️',
      '👩🏻‍🌾',
      '👩🏻‍🍳',
      '👩🏻‍🏫',
      '👩🏻‍🔬',
      '👩🏻‍🎨',
      '👩🏻‍🎨',
      '🦸🏻‍♀️',
    ]).at(0)!;
    return (
      <div className='grid gap-4'>
        <div className='text-center text-9xl'>{icon}</div>
        <Button onClick={() => router.push(`/mirror/${uid}`)}>
          祝你有快樂的一天
        </Button>
      </div>
    );
  }
  if (isBadStudent) {
    return (
      <div className='grid gap-4'>
        <div className='text-center text-4xl py-20'>
          <div>不對！</div>
          <div>你是好學生！</div>
        </div>
        <Button onClick={handleClickIsGood}>對！我要每天堅持做練習！</Button>
      </div>
    );
  }
  return (
    <div className='grid gap-4'>
      <Button onClick={handleClickIsGood}>我是好學生。每天堅持做練習！</Button>
      <Button onClick={handleClickIsBad}>我是壞學生。今天不想做練習！</Button>
    </div>
  );
};
