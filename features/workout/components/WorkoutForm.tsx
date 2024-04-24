'use client';
import SubmitServerActionButton from '@/components/SubmitServerActionButton';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AppUser } from '@/features/user/schema';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { Workout } from '../schema';
import { insertWorkout, updateWorkout } from '../services/actions';

type Props = { users: AppUser[]; title: string; workout?: Workout };

type FormProps = {
  uid: string;
  title: string;
  targetBPM: number;
  errMsg: string;
};

const INITIAL_STATE: FormProps = {
  uid: '',
  title: '',
  targetBPM: 60,
  errMsg: '',
};

const WorkoutForm = ({ users, title, workout }: Props) => {
  const router = useRouter();

  const [value, setValue] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!workout) return;
    setValue((prev) => ({
      ...prev,
      title: workout.title,
      uid: workout.uid,
      targetBPM: workout.targetBPM,
    }));
  }, [workout]);

  const create = () => {
    const newWorkout: Omit<
      Workout,
      'id' | 'created_at' | 'isDev' | 'isReview'
    > = {
      uid: value.uid,
      title: value.title,
      targetBPM: value.targetBPM,
    };

    startTransition(async () => {
      const errMsg = await insertWorkout(newWorkout);
      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }

      router.push(`/mng/workout/list`);
    });
  };

  const update = () => {
    const _workout: Omit<Workout, 'id' | 'created_at' | 'isDev' | 'isReview'> =
      {
        uid: value.uid,
        title: value.title,
        targetBPM: value.targetBPM,
      };

    startTransition(async () => {
      const errMsg = await updateWorkout(workout!.id!, _workout);
      if (errMsg) {
        setValue((prev) => ({ ...prev, errMsg }));
        return;
      }
      router.push(`/mng/workout/list`);
    });
  };

  const action = async () => {
    !!workout ? update() : create();
  };

  return (
    <div className='grid gap-8 max-w-md mx-auto '>
      <div className='text-2xl font-extrabold'>{title}</div>
      <div className='grid gap-4'>
        <Select
          onValueChange={(value) => {
            setValue((prev) => ({
              ...prev,
              uid: value,
              errMst: '',
            }));
          }}
          value={value.uid}
        >
          <SelectTrigger>
            <SelectValue placeholder='user' />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.uid}>
                {user.display}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder='title'
          name='title'
          value={value.title}
          onChange={(e) =>
            setValue((prev) => ({
              ...prev,
              title: e.target.value,
              errMsg: '',
            }))
          }
        />
        <Input
          placeholder='targetBPM'
          type='number'
          value={value.targetBPM}
          onChange={(e) =>
            setValue((prev) => ({
              ...prev,
              targetBPM: parseInt(e.target.value),
            }))
          }
        />
        <SubmitServerActionButton
          errMsg={value.errMsg}
          disabled={!value.uid || !value.title}
          isPending={isPending}
          action={action}
        >
          Submit
        </SubmitServerActionButton>
      </div>
    </div>
  );
};

export default WorkoutForm;
