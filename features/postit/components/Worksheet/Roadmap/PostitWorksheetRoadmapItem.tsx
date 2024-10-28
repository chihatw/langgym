import { cn } from '@/lib/utils';

type Props = {
  preItemCompleted: boolean;
  completed: boolean;
  label: React.ReactNode;
};

const PostitWorksheetRoadmapItem = ({
  preItemCompleted,
  completed,
  label,
}: Props) => {
  return (
    <div
      className={cn(
        'text-lg font-bold flex gap-2 items-center',
        !preItemCompleted && 'text-slate-400'
      )}
    >
      <div>{label}</div>
      {completed ? <div>✅</div> : null}
    </div>
  );
};

export default PostitWorksheetRoadmapItem;
