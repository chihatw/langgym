import { cn } from '@/lib/utils';
import PostitWorksheetPrepareTableTypeCells from './PostitWorksheetPrepareTableTypeCells';

type Props = {
  color: string;
  types: string[];
  bg?: string;
};

const PostitWorksheetPrepareTableColorRow = ({ color, types, bg }: Props) => {
  return (
    <div className='grid grid-cols-[1fr,1fr] items-center border-black/40 border-r'>
      <div
        className={cn(
          ' h-full border-r border-l border-b  border-black/40 flex items-center justify-center',
          !!bg ? bg : ''
        )}
      >
        {color}
      </div>
      <PostitWorksheetPrepareTableTypeCells types={types} />
    </div>
  );
};

export default PostitWorksheetPrepareTableColorRow;
