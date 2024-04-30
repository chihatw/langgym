import React from 'react';

import { FULL_SPACE } from '../constants';
import PitchLine from './PitchLine';

const SentencePitchLine = ({ pitchStr }: { pitchStr: string }) => {
  return (
    <div className='flex flex-wrap'>
      {pitchStr.split(FULL_SPACE).map((_pitchStr, index) => (
        <PitchLine key={index} pitchStr={_pitchStr} />
      ))}
    </div>
  );
};

export default React.memo(SentencePitchLine);
