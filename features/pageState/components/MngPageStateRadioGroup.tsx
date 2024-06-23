'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AppUser } from '@/features/user/schema';
import { updateUser } from '@/features/user/services/actions';
import { useOptimistic, useRef } from 'react';
import { PAGES } from '../constants';

type Props = {
  user: AppUser;
};

type FormProps = {
  pageState: string;
};

const INITIAL_STATE: FormProps = {
  pageState: 'blank',
};

const MngPageStateRadioGroup = ({ user }: Props) => {
  const [optiValue, setPageState] = useOptimistic<FormProps, string>(
    {
      ...INITIAL_STATE,
      pageState: user.realtimePage,
    },
    (state, pageState) => ({ ...state, pageState })
  );

  const form = useRef<HTMLFormElement>(null);
  const ref = useRef(INITIAL_STATE);

  const handleChange = async (_pageState: string) => {
    // ref
    ref.current.pageState = _pageState;
    form.current?.requestSubmit();
  };

  const action = async () => {
    // local
    setPageState(ref.current.pageState);

    // remote
    // todo set redirectTo
    updateUser({
      ...user,
      redirectTo: '/',
      realtimePage: ref.current.pageState,
    });
  };

  return (
    <form action={action} ref={form}>
      <RadioGroup
        className='flex flex-wrap gap-2'
        value={optiValue.pageState || ''}
        onValueChange={(value) => handleChange(value)}
      >
        {Object.entries(PAGES).map(([key, value], index) => (
          <div key={index} className='flex items-center gap-1'>
            <RadioGroupItem value={key} />
            <Label>{value}</Label>
          </div>
        ))}
      </RadioGroup>
    </form>
  );
};

export default MngPageStateRadioGroup;
