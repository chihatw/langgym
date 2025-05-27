'use client';
import MngPaneContainer from '@/components/MngPaneContainer';
import { Input } from '@/components/ui/input';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { createClient } from '@/utils/supabase/client';
import { ChangeEvent, useEffect, useState } from 'react';
import { Pitches, PitchesUser } from '../schema';
import {
  updatePitchesJapanese,
  updatePitchesPitchStr,
  updatePitchesUserPitchStr,
} from '../services/client';

type Props = {
  pitches: Pitches | undefined;
  pitchesUser: PitchesUser | undefined;
};

type FormProps = {
  pitches: Pitches;
  pitchesUser: PitchesUser;
};

const INITIAL_STATE: FormProps = {
  pitches: { id: 0, pitchStr: '', japanese: '' },
  pitchesUser: { id: 0, pitchStr: '' },
};

const MngPitchesForm = ({ pitches, pitchesUser }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  // initialize
  useEffect(() => {
    if (!pitches) {
      setValue((prev) => ({
        ...prev,
        pitches: { id: 0, pitchStr: '', japanese: '' },
      }));
      return;
    }

    setValue((prev) => ({
      ...prev,
      pitches,
    }));
  }, [pitches]);

  // initialize
  useEffect(() => {
    if (!pitchesUser) {
      setValue((prev) => ({
        ...prev,
        pitchesUser: { id: 0, pitchStr: '' },
      }));
      return;
    }

    setValue((prev) => ({ ...prev, pitchesUser }));
  }, [pitchesUser]);

  // subscribe
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel('pitches user')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'pitches_user' },
        (preload) => {
          const updated = preload.new;
          const { id, pitchStr } = updated;
          setValue((prev) => ({ ...prev, pitchesUser: { id, pitchStr } }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleChangeJapanese = (e: ChangeEvent<HTMLInputElement>) => {
    const japanese = e.target.value;
    // local
    setValue((prev) => ({ ...prev, pitches: { ...prev.pitches, japanese } }));

    // remote
    updatePitchesJapanese(value.pitches.id, japanese);
  };

  const handleChangePitchStr = (e: ChangeEvent<HTMLInputElement>) => {
    const pitchStr = e.target.value;
    // local
    setValue((prev) => ({ ...prev, pitches: { ...prev.pitches, pitchStr } }));

    // remote
    updatePitchesPitchStr(value.pitches.id, pitchStr);
    updatePitchesUserPitchStr(value.pitchesUser.id, pitchStr);
  };

  return (
    <MngPaneContainer label='Pitches'>
      <div className='grid gap-4'>
        <Input
          placeholder='japanese'
          value={value.pitches.japanese}
          onChange={handleChangeJapanese}
        />
        <Input
          placeholder='pitchStr'
          value={value.pitches.pitchStr}
          onChange={handleChangePitchStr}
        />
        {!!value.pitchesUser.pitchStr ? (
          <SentencePitchLine pitchStr={value.pitchesUser.pitchStr} />
        ) : null}
      </div>
    </MngPaneContainer>
  );
};

export default MngPitchesForm;
