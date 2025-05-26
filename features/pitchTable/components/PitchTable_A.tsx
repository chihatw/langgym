import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { PitchTableLine } from '../schema';

type Props = { lines: PitchTableLine[] };

const PitchTable_A = ({ lines }: Props) => {
  return (
    <div className='grid'>
      {lines.map((line, index) => (
        <div
          key={index}
          className='h-12 grid grid-cols-[auto_1fr] items-center gap-x-2'
        >
          <div className='text-sm text-black'>{line.japanese}</div>
          <SentencePitchLine pitchStr={line.pitchStr} />
        </div>
      ))}
    </div>
  );
};

export default PitchTable_A;
