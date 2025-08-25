import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import { fetchSentencesByArticleId } from '@/features/article/services/server';
import { getUserFromServerSide } from '@/features/auth/services/server';
import BetterreadForm from '@/features/betterread/components/BetterreadForm/BetterreadForm';
import {
  fetchBetterread,
  fetchBetterreadItems,
} from '@/features/betterread/services/server';

type Props = { params: Promise<{ id: string }> };

const BetterreadPage = async (props: Props) => {
  const params = await props.params;

  const { id } = params;

  const betterreadId = parseInt(id);

  const betterread = await fetchBetterread(parseInt(id));

  if (!betterread || !betterread.articleId) return null;

  const sentences = await fetchSentencesByArticleId(betterread.articleId);

  const betterreadItems = await fetchBetterreadItems(betterreadId);

  const user = await getUserFromServerSide();
  if (!user) return null;

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='課前準備' />
        <BetterreadForm
          sentences={sentences}
          betterreadId={betterreadId}
          betterreadItems={betterreadItems}
        />
      </div>
      <HiddenElements uid={user.id} />
    </>
  );
};

export default BetterreadPage;
