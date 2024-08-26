import { ArticleView } from '@/features/article/schema';
import { fetchArticleById } from '@/features/article/services/server';
import MngBetterreadList from '@/features/betterread/components/MngBetterreadList/MngBetterreadList';
import { fetchBetterreads } from '@/features/betterread/services/server';

type Props = {};

const MngBetterreadListPage = async (props: Props) => {
  const betterreads = await fetchBetterreads();
  const articles: ArticleView[] = [];
  for (let betterread of betterreads) {
    const _article = await fetchArticleById(betterread.articleId);
    if (_article) {
      articles.push(_article);
    }
  }

  return <MngBetterreadList betterreads={betterreads} articles={articles} />;
};

export default MngBetterreadListPage;
