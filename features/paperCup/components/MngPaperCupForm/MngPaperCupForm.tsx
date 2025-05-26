'use client';

import MngPaneContainer from '@/components/MngPaneContainer';
import { Button } from '@/components/ui/button';
import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { RefreshCcw } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { INITIAL_PARAMS } from '../../constants';
import { PaperCupBooleanParams, PaperCupParams } from '../../schema';
import { updatePaperCupParams } from '../../services/client';
import {
  buildCueObject,
  buildPaperCupBooleanParams,
  serializePaperCupParams,
  updateCue,
} from '../../services/utils';
import PatternList from './PatternList';
import PatternSwitches from './PatternSwitches';

type Props = {
  params: PaperCupParams | undefined;
};

export type PaperCupFormProps = PaperCupBooleanParams & { cue: string };

const INITIAL_STATE: PaperCupFormProps = { ...INITIAL_PARAMS, cue: '' };

const MngPaperCupForm = ({ params }: Props) => {
  const [value, setValue] = useState(INITIAL_STATE);

  const cueObj = useMemo(() => {
    return buildCueObject(value.cue);
  }, [value]);

  // from RSC
  useEffect(() => {
    if (!params) return;
    const booleanParams = buildPaperCupBooleanParams(params.params);

    setValue((prev) => ({ ...prev, ...booleanParams, cue: params.cue }));
  }, [params]);

  const handleUpdate = (input: PaperCupBooleanParams) => {
    if (!params) return;
    // local
    const newCue = updateCue(input, value.cue);

    const newParams = serializePaperCupParams(input);

    setValue((prev) => ({ ...prev, ...input, cue: newCue }));

    // remote
    updatePaperCupParams(params.id!, newParams, newCue);
  };

  const handleUpdateCue = () => {
    if (!params) return;
    // local
    const newCue = updateCue(value, value.cue);
    const _params = serializePaperCupParams(value);

    setValue((prev) => ({ ...prev, cue: newCue }));

    // remote
    updatePaperCupParams(params.id!, _params, newCue);
  };

  return (
    <MngPaneContainer label='Paper Cup'>
      <div className='grid gap-4'>
        <div className='grid grid-cols-[1fr_auto] items-center'>
          <div className='flex gap-2'>
            {cueObj.header.pitchStr ? (
              <SentencePitchLine pitchStr={cueObj.header.pitchStr} />
            ) : null}
            {cueObj.nouns.map((noun, index) => (
              <SentencePitchLine key={index} pitchStr={noun.pitchStr} />
            ))}
            <SentencePitchLine pitchStr={cueObj.verb.pitchStr} />
          </div>
          <Button size='icon' variant={'ghost'} onClick={handleUpdateCue}>
            <RefreshCcw />
          </Button>
        </div>
        <PatternSwitches value={value} handleUpdate={handleUpdate} />
        <PatternList value={value} />
      </div>
    </MngPaneContainer>
  );
};

export default MngPaperCupForm;
