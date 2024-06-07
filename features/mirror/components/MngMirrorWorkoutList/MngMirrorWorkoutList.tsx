import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { MirrorWorkoutResult } from '../../schema';

type Props = {
  results: MirrorWorkoutResult[];
};

const MngMirrorWorkoutList = ({ results }: Props) => {
  return (
    <div className='grid gap-y-4'>
      <div className='text-2xl font-extrabold'> Mirror Workout List</div>
      <div>
        <Link href={'#'} className={buttonVariants()}>
          Create New Workout
        </Link>
      </div>
      <div className='p-0 overflow-x-scroll'>
        <pre>{JSON.stringify(results, null, 2)}</pre>
      </div>
    </div>
  );
};

export default MngMirrorWorkoutList;
