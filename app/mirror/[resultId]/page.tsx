import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import MirrorWorkoutResultForm from '@/features/mirror/components/MirrotWorkoutResultForm/MirrorWorkoutResultForm';
import { fetchMirrorWorkoutResultById } from '@/features/mirror/services/server';

type Props = { params: Promise<{ resultId: string }> };

const MirrorWorkoutResultPage = async (props: Props) => {
  const params = await props.params;

  const { resultId } = params;

  const user = await getUserFromServerSide();
  if (!user) return null;

  const result = await fetchMirrorWorkoutResultById(parseInt(resultId));

  if (!result) return null;

  return (
    <>
      <MirrorWorkoutResultForm result={result} />
      <HiddenElements uid={user.id} />
    </>
  );
};

export default MirrorWorkoutResultPage;
