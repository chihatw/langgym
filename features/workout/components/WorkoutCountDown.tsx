'use client';

import { intervalToDuration } from 'date-fns';
import { memo, useEffect, useMemo, useState } from 'react';
import { END_DATE } from '../constants';

type Props = {};

type FormProps = {
  now: Date;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const INITIAL_STATE: FormProps = {
  now: new Date(),
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

const WorkoutCountDown = (props: Props) => {
  const now = new Date();
  const endDate = useMemo(() => new Date(END_DATE), []);
  const [value, setValue] = useState(INITIAL_STATE);

  useEffect(() => {
    const interval = setInterval(() => {
      const { days, hours, minutes, seconds } = intervalToDuration({
        start: new Date(),
        end: endDate,
      });

      setValue((prev) => ({
        ...prev,
        days: days!,
        hours: hours!,
        minutes: minutes!,
        seconds: seconds!,
      }));
    }, 16);
    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className='grid h-10 items-center '>
      {endDate > now ? <WorkoutCountDownMemo {...value} /> : null}
    </div>
  );
};

export default WorkoutCountDown;

const WorkoutCountDownMemo = memo(
  ({
    days,
    hours,
    minutes,
    seconds,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    return (
      <div className='flex items-end justify-center font-mono text-2xl'>
        <div>{days}</div>
        <div className='text-sm'>日</div>
        <div>{hours}</div>
        <div className='text-sm'>小時</div>
        <div>{minutes}</div>
        <div className='text-sm'>分</div>
        <div>{seconds}</div>
        <div className='text-sm'>秒</div>
      </div>
    );
  }
);

WorkoutCountDownMemo.displayName = 'WorkoutCountDownMemo';
