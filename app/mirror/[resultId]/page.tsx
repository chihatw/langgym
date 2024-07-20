import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import MirrorWorkoutResultForm from '@/features/mirror/components/MirrotWorkoutResultForm/MirrorWorkoutResultForm';
import {
  fetchLatestMirrorWorkoutResultByUid,
  fetchMirrorWorkoutResultById,
} from '@/features/mirror/services/server';

type Props = { params: { resultId: string } };

const MirrorWorkoutResultPage = async ({ params: { resultId } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const result = await fetchMirrorWorkoutResultById(parseInt(resultId));

  if (!result) return null;

  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(user.id);

  return (
    <>
      <MirrorWorkoutResultForm result={result} />
      <HiddenElements uid={user.id} latestMirrorResult={latestMirrorResult} />
    </>
  );
};

export default MirrorWorkoutResultPage;
