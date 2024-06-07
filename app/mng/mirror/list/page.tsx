import MngMirrorWorkoutList from '@/features/mirror/components/MngMirrorWorkoutList/MngMirrorWorkoutList';
import { fetchMirrorWorkoutResults } from '@/features/mirror/services/server';

type Props = {};

const MngMirrorListPage = async (props: Props) => {
  const results = await fetchMirrorWorkoutResults();
  return <MngMirrorWorkoutList results={results} />;
};

export default MngMirrorListPage;
