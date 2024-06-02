'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useTransition } from 'react';
import { updatePassword } from '../services/actions';

type Props = {};

type FormProps = {
  password: string;
  errMsg: string;
};

const INITIAL_STATE: FormProps = {
  password: '',
  errMsg: '',
};

const ChangePasswordForm = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  const action = async () => {
    startTransition(async () => {
      const errMsg = await updatePassword(value.password);
      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }

      setValue(INITIAL_STATE);
    });
  };
  return (
    <div className='grid gap-4'>
      <Input
        type='password'
        placeholder='new password'
        value={value.password}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            password: e.target.value,
          }))
        }
      />
      <form action={action} className='grid'>
        <Button type='submit' disabled={isPending || value.password.length < 6}>
          Update
        </Button>
      </form>
      {value.errMsg ? (
        <div className='text-red-500 text-xs'>{value.errMsg}</div>
      ) : null}
    </div>
  );
};

export default ChangePasswordForm;
