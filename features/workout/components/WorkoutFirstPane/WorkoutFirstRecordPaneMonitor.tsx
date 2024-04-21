import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { WorkoutFirst } from '../../schema';

type Props = {
  item: WorkoutFirst;
};

const WorkoutFirstRecordPaneMonitor = ({ item }: Props) => {
  return (
    <div className='grid gap-y-2 border-[0.5px] p-2 rounded'>
      <div className='p-0 text-sm'>{item.japanese}</div>
      <div className='text-[11px] text-[#52a2aa]'>{item.chinese}</div>

      <div className='p-2 rounded border-[0.5px] border-slate-500'>
        <SentencePitchLine pitchStr={item.pitchStr} />
      </div>
    </div>
  );
};

export default WorkoutFirstRecordPaneMonitor;
