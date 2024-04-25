import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { WorkoutItemView } from '../../schema';

type Props = {
  index: number;
  item: WorkoutItemView;
};

const WorkoutRow = ({ index, item }: Props) => {
  return (
    <div className='rounded bg-white/60 p-5 grid gap-2'>
      <div className='text-xs font-extrabold'>{index + 1}</div>

      <div className='text-sm'>{item.japanese}</div>
      <div className='text-xs text-teal-600'>{item.chinese}</div>
      <div className='p-2 rounded bg-slate-200'>
        <SentencePitchLine pitchStr={item.pitchStr!} />
      </div>
    </div>
  );
};

export default WorkoutRow;
