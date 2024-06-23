'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { AppUser } from '@/features/user/schema';
import { updateUser } from '@/features/user/services/actions';
import { useOptimistic, useRef } from 'react';

type Props = {
  user: AppUser;
};

type FormProps = {
  realtime: boolean;
};
const INITIAL_STATE: FormProps = {
  realtime: false,
};

const MngRealtimeToggle = ({ user }: Props) => {
  const form = useRef<HTMLFormElement>(null);
  const [optiValue, setRealtime] = useOptimistic<FormProps, boolean>(
    { ...INITIAL_STATE, realtime: user.realtime },
    (state, realtime) => ({
      ...state,
      realtime,
    })
  );

  const handleClick = () => {
    form.current?.requestSubmit();
  };

  const action = async () => {
    const realtime = !optiValue.realtime;
    // local
    setRealtime(realtime);

    // remote
    // todo set redirectTo
    const newUser: AppUser = {
      ...user,
      realtime,
      redirectTo: realtime ? '/realtime' : '/',
    };
    updateUser(newUser);
  };

  return (
    <form ref={form} action={action}>
      <div className='flex gap-2 items-center'>
        <Checkbox checked={optiValue.realtime} onClick={handleClick} />
        <div className='text-xs'>realtime</div>
      </div>
    </form>
  );
};

export default MngRealtimeToggle;
