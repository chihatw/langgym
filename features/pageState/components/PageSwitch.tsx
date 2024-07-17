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
import { useRouter } from 'next/navigation';
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
    created_at: new Date(),
    realtimePage: 'blank',
  },
};

// todo これをページごとに url を分ける
const PageSwitch = ({ user }: Props) => {
  const router = useRouter();

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
      // will delete
      return <SpeedWorkoutForm />;
    case 'sokudokuCue':
      // will delete
      return <SpeedWorkoutCueForm />;
    case 'paperCups':
      // will delete
      return <PaperCupForm />;

    case 'ga_wo_ni':
      // will delete
      return <div>がをに</div>;
    case 'record':
      // will delete
      return <RecordForm />;
    case 'note':
      // will delete
      return <NoteForm />;
    case 'pitches':
      // will delete
      return <PitchesForm />;
    case 'betterread':
      // will delete
      return <BetterreadView />;
    case 'mirror':
      // will delete
      router.push('/realtime/mirror');
      return null;
    case 'canvas':
    // will delete
    case 'blank':
      return null;
    default:
      return <div>{value.user.realtimePage}</div>;
  }
};

export default PageSwitch;
