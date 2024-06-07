import BorderLabel from '@/components/BorderLabel';
import Link from 'next/link';
import { MIRROR_WORKOUTS_LABEL } from '../../constants';
import { fetchMirrorWorkoutResultByUid } from '../../services/server';
import MirrorWorkoutResultCallender from './MirrorWorkoutResultCallender';
import MirrorWorkoutResultList from './MirrorWorkoutResultList';
import MirrorWorkoutResultsChart from './MirrorWorkoutResultsChart';

type Props = { uid: string };

const MirrorNumbersLoader = async ({ uid }: Props) => {
  const results = await fetchMirrorWorkoutResultByUid(uid);

  return (
    <div className='grid gap-4'>
      <BorderLabel label={MIRROR_WORKOUTS_LABEL} />
      <div className='grid gap-4'>
        <div className='bg-white/60 p-5 rounded-lg block'>
          <Link href={`/mirror/${uid}`}>
            <div className='grid gap-4 '>{`練習`}</div>
          </Link>
        </div>
        <MirrorWorkoutResultCallender results={results} />
        {results.length ? (
          <div className='grid gap-4'>
            <MirrorWorkoutResultsChart results={results} />
            <MirrorWorkoutResultList results={results} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MirrorNumbersLoader;
