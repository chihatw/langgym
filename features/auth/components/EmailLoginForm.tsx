'use client';

import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Input } from '@/components/ui/input';
import PathnameLog from '@/features/pathnameLog/components/PathnameLog';
import { REMOTE_TRIGGER_ID } from '@/features/trigger/constants';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { isValidEmail } from '@/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, useTransition } from 'react';
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

  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  // initialize with searchParams
  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      email: searchParams.get('email') || '',
      password: searchParams.get('password') || '',
    }));
  }, [searchParams]);

  const login = useCallback(() => {
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
  }, [router, value.email, value.password]);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('remote login trigger')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'remote_trigger',
          filter: `id=eq.${REMOTE_TRIGGER_ID.login}`,
        },
        () => {
          login();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [login]);

  const action = async () => {
    login();
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
      <PathnameLog uid={searchParams.get('uid')} />
    </>
  );
};

export default EmailLoginForm;
