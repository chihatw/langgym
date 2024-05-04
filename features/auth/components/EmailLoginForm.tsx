'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Input } from '@/components/ui/input';
import PathnameLog from '@/features/log/components/PathnameLog';
import { isValidEmail } from '@/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { signInWithEmailAndPassword } from '../services/actions';

type Props = {};

type FormProps = {
  email: string;
  password: string;
  errMsg: string;
};

const INITIAL_STATE: FormProps = {
  email: '',
  password: '',
  errMsg: '',
};

const EmailLoginForm = (props: Props) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const password = searchParams.get('password');
  const uid = searchParams.get('uid');

  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  // initialize
  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      email: email || '',
      password: password || '',
    }));
  }, [email, password]);

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
    <>
      <div className='grid max-w-sm mx-auto gap-4 pt-20'>
        <Input
          type='email'
          placeholder='Email'
          value={value.email}
          onChange={(e) =>
            setValue((prev) => ({
              ...prev,
              email: e.target.value,
              errMsg: '',
            }))
          }
          autoComplete='off'
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
            }))
          }
          autoComplete='off'
        />
        <SubmitServerActionButton
          action={action}
          isPending={isPending}
          disabled={!isValidEmail(value.email) || value.password.length < 6}
          errMsg={value.errMsg}
        >
          Login
        </SubmitServerActionButton>
      </div>
      <PathnameLog uid={uid} />
    </>
  );
};

export default EmailLoginForm;
