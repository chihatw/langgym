'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isValidEmail } from '@/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { signInWithEmailAndPassword } from '../services/actions';

type Props = {};

type FormProps = {
  email: string;
  password: string;
  disabled: boolean;
  errMsg: string;
};

const INITIAL_STATE: FormProps = {
  email: '',
  password: '',
  disabled: true,
  errMsg: '',
};

const EmailLoginForm = (props: Props) => {
  const router = useRouter();
  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  const action = async () => {
    startTransition(async () => {
      const errMsg = await signInWithEmailAndPassword(
        value.email,
        value.password
      );

      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }
      router.push('/');
    });
  };

  return (
    <form
      className='grid max-w-sm mx-auto gap-4 pt-20'
      action={action}
      autoComplete='off'
    >
      <Input
        type='email'
        placeholder='Email'
        value={value.email}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            email: e.target.value,
            errMsg: '',
            disabled: !isValidEmail(e.target.value) || prev.password.length < 6,
          }))
        }
      />
      <Input
        type='password'
        placeholder='Password'
        value={value.password}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            password: e.target.value,
            errMsg: '',
            disabled: !isValidEmail(prev.email) || e.target.value.length < 6,
          }))
        }
      />
      <Button
        type='submit'
        disabled={value.disabled || isPending}
        className='flex items-center gap-x-0.5'
      >
        Login
        {isPending ? <Loader2 className='animate-spin' /> : null}
      </Button>
      {value.errMsg ? (
        <div className='text-xs text-red-500'>{value.errMsg}</div>
      ) : null}
    </form>
  );
};

export default EmailLoginForm;
