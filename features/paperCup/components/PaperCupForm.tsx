'use client';
import { Button } from '@/components/ui/button';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { RefreshCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { PaperCupCueObj, PaperCupParams } from '../schema';
import { updatePaperCupParams } from '../services/client';
import {
  buildCueObject,
  buildPaperCupBooleanParams,
  updateCue,
} from '../services/utils';

type Props = { params: PaperCupParams | undefined };

type FormProps = {
  cue: string;
  params: string;
};

const INITIAL_STATE: FormProps = {
  cue: '',
  params: '',
};

const PaperCupForm = ({ params }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const { cueObj, booleanParams } = useMemo(() => {
    if (!value.cue || !value.params)
      return { cueObj: undefined, booleanParams: undefined };
    return {
      cueObj: buildCueObject(value.cue),
      booleanParams: buildPaperCupBooleanParams(value.params),
    };
  }, [value]);

  // from RSC
  useEffect(() => {
    if (!params) {
      setValue((prev) => ({ ...prev, ...INITIAL_STATE }));
      return;
    }
    setValue((prev) => ({ ...prev, ...params }));
  }, [params]);

  // subscribe
  useEffect(() => {
    const supabase = createSupabaseClientComponentClient();

    const channel = supabase
      .channel('paper cup')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'paper_cup_params' },
        (preload) => {
          const updated = preload.new;
          const { cue, params } = updated;
          setValue((prev) => ({ ...prev, cue, params }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleClick = () => {
    if (!booleanParams || !params) return;

    const newCue = updateCue(booleanParams, value.cue);

    // local
    setValue((prev) => ({ ...prev, cue: newCue }));

    // remote
    updatePaperCupParams(params.id, value.params, newCue);
  };

  return (
    <div className='mx-auto max-w-md'>
      <div className='grid gap-2'>
        <div className='my-4 h-[300px]'>
          {cueObj ? <CuePane cueObj={cueObj} /> : null}
        </div>
        <div className='text-center'>
          <Button
            size='icon'
            variant='ghost'
            className='h-24 w-24 rounded-full'
            onClick={handleClick}
          >
            <RefreshCcw className='h-24 w-24' />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaperCupForm;

const CuePane = ({ cueObj }: { cueObj: PaperCupCueObj }) => {
  return (
    <div className='h-[200px]'>
      <div className='grid flex-1 gap-4'>
        {!!cueObj.header.pitchStr && (
          <CueCard
            label={cueObj.header.label}
            pitchStr={cueObj.header.pitchStr}
          />
        )}
        {cueObj.nouns.map((noun, index) => (
          <CueCard key={index} label={noun.label} pitchStr={noun.pitchStr} />
        ))}
        <CueCard label={cueObj.verb.label} pitchStr={cueObj.verb.pitchStr} />
      </div>
    </div>
  );
};

const CueCard = ({ label, pitchStr }: { label: string; pitchStr: string }) => {
  return (
    <div className='h-12  grid grid-cols-2 items-center rounded-lg  pr-2 bg-white/60 min-w-[320px]'>
      <div className='text-center'>{label}</div>
      <div className='flex justify-center'>
        <SentencePitchLine pitchStr={pitchStr} />
      </div>
    </div>
  );
};
