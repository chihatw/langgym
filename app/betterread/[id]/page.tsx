import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import { fetchSentencesByArticleId } from '@/features/article/services/server';
import { getUserFromServerSide } from '@/features/auth/services/server';
import BetterreadForm from '@/features/betterread/components/BetterreadForm/BetterreadForm';
import { BetterReadItemQuestion } from '@/features/betterread/schema';
import {
  fetchBetterread,
  fetchBetterreadItemQuestions,
  fetchBetterreadItems,
} from '@/features/betterread/services/server';
import { fetchLatestMirrorWorkoutResultByUid } from '@/features/mirror/services/server';

type Props = { params: { id: string } };

const BetterreadPage = async ({ params: { id } }: Props) => {
  const betterreadId = parseInt(id);

  const betterread = await fetchBetterread(parseInt(id));

  if (!betterread || !betterread.articleId) return null;

  const sentences = await fetchSentencesByArticleId(betterread.articleId);

  const betterreadItems = await fetchBetterreadItems(betterreadId);

  const betterreadItemIds = betterreadItems.map((item) => item.id);

  let betterreadItemQuestions: BetterReadItemQuestion[] = [];
  if (betterreadItemIds.length) {
    betterreadItemQuestions = await fetchBetterreadItemQuestions(
      betterreadItemIds
    );
  }

  const user = await getUserFromServerSide();
  if (!user) return null;

  const latestMirrorResult = await fetchLatestMirrorWorkoutResultByUid(user.id);

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='課前準備' />
        <BetterreadForm
          sentences={sentences}
          betterreadId={betterreadId}
          betterreadItems={betterreadItems}
          betterreadItemQuestions={betterreadItemQuestions}
        />
      </div>
      <HiddenElements uid={user.id} latestMirrorResult={latestMirrorResult} />
    </>
  );
};

export default BetterreadPage;
