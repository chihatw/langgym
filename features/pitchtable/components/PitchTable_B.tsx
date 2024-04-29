import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { PitchTableLine } from '../schema';

type Props = {
  lines: PitchTableLine[];
};

const PitchTable_B = ({ lines }: Props) => {
  return (
    <div className='grid gap-4'>
      {lines.map((line, index) => (
        <div key={index} className='grid items-center gap-1'>
          <div className='text-xs'>{`${index + 1}.`}</div>
          <div className='text-sm text-black'>{line.japanese}</div>
          <div className='text-xs text-black/50'>{line.chinese}</div>
          <SentencePitchLine pitchStr={line.pitchStr} />
        </div>
      ))}
    </div>
  );
};

export default PitchTable_B;
