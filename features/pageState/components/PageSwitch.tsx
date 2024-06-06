'use client';

import BetterreadView from '@/features/betterread/components/BetterreadView/BetterreadView';
import NoteForm from '@/features/note/components/NoteForm';
import PaperCupForm from '@/features/paperCup/components/PaperCupForm';
import PitchesForm from '@/features/pitches/components/PitchesForm';
import RecordForm from '@/features/record/components/RecordForm';
import SpeedWorkoutCueForm from '@/features/speedWorkout/components/SpeedWorkoutCueForm/SpeedWorkoutCueForm';
import SpeedWorkoutForm from '@/features/speedWorkout/components/SpeedWorkoutForm';
import { AppUser } from '@/features/user/schema';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  user: AppUser;
};

type FormProps = {
  user: AppUser;
};

const INITIAL_STATE: FormProps = {
  user: {
    uid: '',
    display: '',
    realtime: false,
    realtimePage: 'blank',
    created_at: new Date(),
  },
};

const PageSwitch = ({ user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [value, setValue] = useState(INITIAL_STATE);

  // set values from RSC
  useEffect(() => {
    setValue((prev) => ({ ...prev, user }));
  }, [user]);

  // subscrive
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel(`page switch ${nanoid()}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `uid=eq.${user.uid}`,
        },
        (preload) => {
          console.log('update user');
          const updated = preload.new;
          const { realtime, realtimePage } = updated;
          setValue((prev) => ({
            ...prev,
            user: { ...user, realtime, realtimePage },
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  switch (value.user.realtimePage) {
    case 'sokudokuRenshu':
      return <SpeedWorkoutForm />;
    case 'sokudokuCue':
      return <SpeedWorkoutCueForm />;
    case 'paperCups':
      return <PaperCupForm />;
    case 'ga_wo_ni':
      return <div>がをに</div>;
    case 'record':
      return <RecordForm />;
    case 'note':
      return <NoteForm />;
    case 'pitches':
      return <PitchesForm />;
    case 'betterread':
      return <BetterreadView />;
    case 'mirror':
      router.push('/realtime/mirror');
      return null;
    case 'canvas':
    case 'blank':
      return null;
    default:
      return <div>{value.user.realtimePage}</div>;
  }
};

export default PageSwitch;
