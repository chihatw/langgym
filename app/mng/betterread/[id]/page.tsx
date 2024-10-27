import { fetchSentencesByArticleId } from '@/features/article/services/server';
import BetterreadForm from '@/features/betterread/components/BetterreadForm/BetterreadForm';
import {
  fetchBetterread,
  fetchBetterreadItems,
} from '@/features/betterread/services/server';

type Props = {
  params: Promise<{ id: string }>;
};

const MngBetterreadPage = async (props: Props) => {
  const params = await props.params;

  const {
    id
  } = params;

  const betterreadId = parseInt(id);

  const betterread = await fetchBetterread(betterreadId);

  if (!betterread || !betterread.articleId) return null;

  const sentences = await fetchSentencesByArticleId(betterread.articleId);

  const betterreadItems = await fetchBetterreadItems(betterreadId);

  // const betterreadItemIds = betterreadItems.map((item) => item.id);

  // let betterreadItemQuestions: BetterReadItemQuestion[] = [];
  // if (betterreadItemIds.length) {
  //   betterreadItemQuestions = await fetchBetterreadItemQuestions(
  //     betterreadItemIds
  //   );
  // }

  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <BetterreadForm
        sentences={sentences}
        betterreadId={betterreadId}
        betterreadItems={betterreadItems}
        // betterreadItemQuestions={betterreadItemQuestions}
      />
    </div>
  );
};

export default MngBetterreadPage;
