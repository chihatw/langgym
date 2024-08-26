import BorderLabel from '@/components/BorderLabel';
import { fetchArticleById } from '@/features/article/services/server';
import { fetchBetterreadByUid } from '../services/server';
import Betterread from './Betterread';

type Props = { uid: string };

const BetterreadContainer = async ({ uid }: Props) => {
  const betterread = await fetchBetterreadByUid(uid);
  if (!betterread) return null;

  const article = await fetchArticleById(betterread.articleId);
  if (!article) return null;

  return (
    <div className='grid gap-4'>
      <BorderLabel label='課前準備' />
      <Betterread betterread={betterread} title={article.title!} />
    </div>
  );
};

export default BetterreadContainer;
