import { fetchLatestArticleByUid } from '@/features/article/services/server';
import { fetchBetterreadImagePathsByArticleId } from '@/features/betterread/services/server';
import { fetchPageStateByUid } from '@/features/pageState/services/server';
import { fetchPaperCupParams } from '@/features/paperCup/services/server';
import { fetchSpeedWorkout } from '@/features/speedWorkout/services/server';
import { fetchWorkoutItems } from '@/features/workout/services/server';
import RealtimeModal from './RealtimeModal';

type Props = { uid: string };

const RealtimeModalContainer = async ({ uid }: Props) => {
  const pageState = await fetchPageStateByUid(uid);
  const workoutItems = await fetchWorkoutItems();
  const speedWorkout = await fetchSpeedWorkout();
  const article = await fetchLatestArticleByUid(uid);
  const paperCupParams = await fetchPaperCupParams();

  const betterreadImagePaths = article
    ? await fetchBetterreadImagePathsByArticleId(article.id)
    : [];

  if (!pageState) return <></>;

  return (
    <RealtimeModal
      uid={uid}
      pageState={pageState}
      workoutItems={workoutItems}
      speedWorkout={speedWorkout}
      betterreadImagePaths={betterreadImagePaths}
      paperCupParams={paperCupParams}
    />
  );
};

export default RealtimeModalContainer;
