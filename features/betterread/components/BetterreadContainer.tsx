import BorderLabel from '@/components/BorderLabel';
import { fetchArticlesByIds } from '@/features/article/services/server';
import { fetchBetterreadsByUid } from '../services/server';
import Betterread from './Betterread';

type Props = { uid: string };

const BetterreadContainer = async ({ uid }: Props) => {
  const betterreads = await fetchBetterreadsByUid(uid);
  if (!betterreads.length) return null;

  const articles = await fetchArticlesByIds(
    betterreads.map((item) => item.articleId)
  );
  if (!articles.length) return null;

  return (
    <div className='grid gap-4'>
      <BorderLabel label='課前準備' />
      <div className='grid gap-4'>
        {betterreads.map((betterread) => (
          <Betterread
            betterread={betterread}
            title={
              articles.find((item) => item.id === betterread.articleId)
                ?.title || ''
            }
          />
        ))}
      </div>
    </div>
  );
};

export default BetterreadContainer;
