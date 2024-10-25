import BorderLabel from '@/components/BorderLabel';
import Link from 'next/link';
import { fetchPostItWorkoutByUid } from '../services/server';

type Props = { uid: string };

const PostItLoader = async ({ uid }: Props) => {
  const workout = await fetchPostItWorkoutByUid(uid);

  if (!workout) return null;

  return (
    <div className='grid gap-4'>
      <BorderLabel label='利貼日文' />

      {workout ? (
        <div className='p-5 bg-white/60 rounded-lg grid gap-4'>
          <Link href={`/postit/workout`} className='hover:cursor-pointer'>
            <div className='grid gap-4 '>利貼學習單</div>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default PostItLoader;
