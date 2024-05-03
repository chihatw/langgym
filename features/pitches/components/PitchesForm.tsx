'use client';

import { Slider } from '@/components/ui/slider';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { ACCENT_MARK } from '@/features/pitchLine/constants';
import {
  buildMoras,
  buildMoras_no_remove_mark,
} from '@/features/pitchLine/services/utils';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';
import {
  fetchPitches,
  fetchPitchesUser,
  updatePitchesUserPitchStr,
} from '../services/client';

type Props = {};

type FormProps = {
  index: number;
  japanese: string;
  pitchStr: string;
  pitchesUserId: number;
};

const INITIAL_STATE: FormProps = {
  index: 0,
  japanese: '',
  pitchStr: '',
  pitchesUserId: 0,
};

const PitchesForm = (props: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const moras = useMemo(() => buildMoras(value.pitchStr), [value]);

  // initialize
  useEffect(() => {
    (async () => {
      const pitches = await fetchPitches();
      if (!pitches) {
        setValue(INITIAL_STATE);
        return;
      }
      setValue((prev) => ({
        ...prev,
        japanese: pitches.japanese,
        pitchStr: pitches.pitchStr,
        index: getAccentIndex(pitches.pitchStr),
      }));
    })();
  }, []);

  // initialize
  useEffect(() => {
    (async () => {
      const pitchesUser = await fetchPitchesUser();

      if (!pitchesUser) {
        setValue(INITIAL_STATE);
        return;
      }

      setValue((prev) => ({
        ...prev,
        pitchStr: pitchesUser.pitchStr,
        pitchesUserId: pitchesUser.id,
      }));
    })();
  }, []);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();
    const channel = supabase
      .channel('pitches')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'pitches' },
        (preload) => {
          const updated = preload.new;
          const { pitchStr, japanese } = updated;
          setValue((prev) => ({
            ...prev,
            japanese,
            pitchStr,
            index: getAccentIndex(pitchStr),
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleChange = (_value: number[]) => {
    const index = _value[0];
    const pitchStr = buildNewPitchStr(value.pitchStr, index);
    // local
    setValue((prev) => ({
      ...prev,
      pitchStr,
      index,
    }));

    // remote
    updatePitchesUserPitchStr(value.pitchesUserId, pitchStr);
  };

  return (
    <div className='mx-auto max-w-md flex flex-col gap-12 w-full'>
      <div className='grid gap-4'>
        <div className='text-center text-sm'>{value.japanese}</div>
        <div className='grid bg-white/60 p-5 rounded justify-center'>
          <SentencePitchLine pitchStr={value.pitchStr} />
        </div>
      </div>
      <div className='grid gap-3'>
        <Slider
          min={0}
          max={moras.length}
          step={1}
          value={[value.index]}
          onValueChange={handleChange}
        />
        <div className='flex px-2.5 relative'>
          {moras.map((_, index) => (
            <div
              key={index}
              className={cn(
                'flex-1  -ml-1   font-extrabold',
                !!index && value.index === index
                  ? 'text-red-500'
                  : 'text-slate-700'
              )}
            >
              {index}
            </div>
          ))}
          <div
            className={cn(
              'absolute text-slate-700 font-extrabold right-0 -top-0',
              value.index === moras.length ? 'text-red-500' : 'text-slate-700'
            )}
          >
            {moras.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchesForm;

function buildNewPitchStr(pitchStr: string, accentIndex: number) {
  const moras = buildMoras(pitchStr);

  if (accentIndex > 0) {
    moras.splice(accentIndex, 0, ACCENT_MARK);
  }

  return moras.join('');
}

function getAccentIndex(pitchStr: string) {
  return Math.max(buildMoras_no_remove_mark(pitchStr).indexOf(ACCENT_MARK), 0);
}
