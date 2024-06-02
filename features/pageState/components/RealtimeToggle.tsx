'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { AppUser } from '@/features/user/schema';
import { updateUser } from '@/features/user/services/actions';
import { useEffect, useRef, useState } from 'react';

type Props = {
  user: AppUser;
};

type FormProps = {
  realtime: boolean;
};
const INITIAL_STATE: FormProps = {
  realtime: false,
};

const RealtimeToggle = ({ user }: Props) => {
  const form = useRef<HTMLFormElement>(null);
  const [value, setValue] = useState(INITIAL_STATE);
  const ref = useRef(INITIAL_STATE);

  useEffect(() => {
    setValue((prev) => ({ ...prev, realtime: user.realtime }));
  }, [user]);

  const handleChange = (value: boolean) => {
    ref.current.realtime = value;
    form.current?.requestSubmit();
  };

  const action = async () => {
    // local
    setValue((prev) => ({
      ...prev,
      realtime: ref.current.realtime,
    }));

    // remote
    const newUser: AppUser = {
      ...user,
      realtime: ref.current.realtime,
    };

    updateUser(newUser);
  };

  return (
    <form ref={form} action={action}>
      <div className='flex gap-2 items-center'>
        <Checkbox checked={value.realtime} onCheckedChange={handleChange} />
        <div className='text-xs'>realtime</div>
      </div>
    </form>
  );
};

export default RealtimeToggle;
