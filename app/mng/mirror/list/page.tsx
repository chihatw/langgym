import MngMirrorWorkoutList from '@/features/mirror/components/MngMirrorWorkoutList/MngMirrorWorkoutList';
import { fetchMirrorWorkoutResultItemViews } from '@/features/mirror/services/server';

type Props = {};

const MngMirrorListPage = async (props: Props) => {
  const resultItems = await fetchMirrorWorkoutResultItemViews();

  return <MngMirrorWorkoutList resultItems={resultItems} />;
};

export default MngMirrorListPage;
