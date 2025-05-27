'use client';
import { Button } from '@/components/ui/button';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { createClient } from '@/utils/supabase/client';
import { RefreshCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { PaperCupCueObj, PaperCupParams } from '../schema';
import { fetchPaperCupParams, updatePaperCupParams } from '../services/client';
import {
  buildCueObject,
  buildPaperCupBooleanParams,
  updateCue,
} from '../services/utils';

type Props = {};

type FormProps = PaperCupParams;

const INITIAL_STATE: FormProps = {
  id: 0,
  cue: '',
  params: '',
  created_at: new Date(),
};

const PaperCupForm = ({}: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const { cueObj, booleanParams } = useMemo(() => {
    if (!value.cue || !value.params)
      return { cueObj: undefined, booleanParams: undefined };
    return {
      cueObj: buildCueObject(value.cue),
      booleanParams: buildPaperCupBooleanParams(value.params),
    };
  }, [value]);

  // initialize
  useEffect(() => {
    (async () => {
      const params = await fetchPaperCupParams();
      if (!params) return;
      setValue(params);
    })();
  }, []);

  // subscribe
  useEffect(() => {
    const supabase = createClient();

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
    if (!booleanParams) return;

    const newCue = updateCue(booleanParams, value.cue);

    // local
    setValue((prev) => ({ ...prev, cue: newCue }));

    // remote
    updatePaperCupParams(value.id, value.params, newCue);
  };

  return (
    <div className='mx-auto max-w-md flex flex-col w-full gap-2'>
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
    <div className='min-h-12  grid grid-cols-2 items-center rounded-lg  pr-2 bg-white/60 min-w-[320px]'>
      <div className='text-center'>{label}</div>
      <div className='flex justify-center'>
        <SentencePitchLine pitchStr={pitchStr} />
      </div>
    </div>
  );
};
