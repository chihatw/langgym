import MngHeader from '@/components/MngHeader';
import { fetchAnswers } from '@/features/answer/services/server';
import {
  fetchArticles,
  fetchSentencesByArticleIds,
} from '../../services/server';
import MngArticleList from './MngArticleList';

const MngArticleListLoader = async () => {
  const articles = await fetchArticles(10);
  const sentences = await fetchSentencesByArticleIds(
    articles.map(({ id }) => id!)
  );
  const answers = await fetchAnswers();

  return (
    <div className='grid gap-4 max-w-lg mx-auto pb-40'>
      <MngHeader />
      <MngArticleList
        articles={articles}
        sentences={sentences}
        answers={answers}
      />
    </div>
  );
};

export default MngArticleListLoader;
