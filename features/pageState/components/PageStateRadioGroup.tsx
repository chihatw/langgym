'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AppUser } from '@/features/user/schema';
import { updateUser } from '@/features/user/services/actions';
import { useEffect, useRef, useState } from 'react';
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

const PageStateRadioGroup = ({ user }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const form = useRef<HTMLFormElement>(null);
  const ref = useRef(INITIAL_STATE);

  // set value from RSC
  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      pageState: user.realtimePage,
    }));
  }, [user]);

  const handleChange = async (_pageState: string) => {
    // ref
    ref.current.pageState = _pageState;
    form.current?.requestSubmit();
  };

  const action = async () => {
    // local
    setValue((prev) => ({
      ...prev,
      pageState: ref.current.pageState,
    }));

    // remote
    updateUser({ ...user, realtimePage: ref.current.pageState });
  };

  return (
    <form action={action} ref={form}>
      <RadioGroup
        className='flex flex-wrap gap-2'
        value={value.pageState || ''}
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

export default PageStateRadioGroup;
