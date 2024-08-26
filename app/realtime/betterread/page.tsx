import HiddenElements from '@/components/HiddenElements';
import { getUserFromServerSide } from '@/features/auth/services/server';
import BetterreadView from '@/features/betterread/components/BetterreadView/BetterreadView';
import { BetterReadItemQuestion } from '@/features/betterread/schema';
import {
  fetchBetterreadItemQuestions,
  fetchBetterreadItems,
  fetchBetterreadsByUid,
} from '@/features/betterread/services/server';

type Props = {};

const RealtimeBetterReadPage = async (props: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const betterreads = await fetchBetterreadsByUid(user.id);

  const betterread = betterreads.at(-1);

  if (!betterread) return null;

  const betterreadItems = await fetchBetterreadItems(betterread.id);

  let betterreadItemQuestions: BetterReadItemQuestion[] = [];

  if (betterreadItems.length) {
    betterreadItemQuestions = await fetchBetterreadItemQuestions(
      betterreadItems.map((i) => i.id)
    );
  }

  return (
    <>
      <BetterreadView
        betterreadItems={betterreadItems}
        betterreadItemQuestions={betterreadItemQuestions}
      />
      <HiddenElements uid={user.id} cheat={true} />
    </>
  );
};

export default RealtimeBetterReadPage;
