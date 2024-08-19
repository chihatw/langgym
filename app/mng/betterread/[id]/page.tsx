import BetterreadForm from '@/features/betterread/components/BetterreadForm/BetterreadForm';
import { BetterReadItemQuestion } from '@/features/betterread/schema';
import {
  fetchBetterreadItemQuestions,
  fetchBetterreadItems,
  fetchBetterreadViews,
} from '@/features/betterread/services/server';

type Props = {
  params: { id: string };
};

const MngBetterreadPage = async ({ params: { id } }: Props) => {
  const betterreadId = parseInt(id);
  const betterreads = await fetchBetterreadViews(betterreadId);
  const betterreadItems = await fetchBetterreadItems(betterreadId);

  const betterreadItemIds = betterreadItems.map((item) => item.id);

  let betterreadItemQuestions: BetterReadItemQuestion[] = [];
  if (betterreadItemIds.length) {
    betterreadItemQuestions = await fetchBetterreadItemQuestions(
      betterreadItemIds
    );
  }

  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <BetterreadForm
        betterreadId={betterreadId}
        betterreads={betterreads}
        betterreadItems={betterreadItems}
        betterreadItemQuestions={betterreadItemQuestions}
      />
    </div>
  );
};

export default MngBetterreadPage;
