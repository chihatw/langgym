import SentencePitchLine from '@/features/pitchLine/components/SentencePitchLine';
import { WorkoutSecondFormProps } from './WorkoutSecondPane';

type Props = {
  value: WorkoutSecondFormProps;
};

const WorkoutSecondRecordPaneMonitor = ({ value }: Props) => {
  return (
    <div className='grid gap-1 max-h-[320px]  overflow-scroll'>
      {value.shuffledIds.map((id, index) => {
        const item = value.items.find((item) => item.id === id)!;
        return (
          <div
            key={index}
            className='rounded py-1 bg-slate-200 grid grid-cols-[auto,1fr] gap-2 items-center px-2'
          >
            <div className='text-xs font-extrabold'>{index + 1}</div>
            <SentencePitchLine pitchStr={item.pitchStr} />
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutSecondRecordPaneMonitor;
