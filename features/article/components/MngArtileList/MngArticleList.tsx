'use client';
import { buttonVariants } from '@/components/ui/button';
import { ArticlePitchQuizAnswerView } from '@/features/answer/schema';
import Link from 'next/link';
import { useOptimistic } from 'react';
import { ArticleView, SentenceView } from '../../schema';
import MngArticleListRow from './MngArticleListRow';

type Props = {
  articles: ArticleView[];
  sentences: SentenceView[];
  answers: ArticlePitchQuizAnswerView[];
};

const MngArticleList = ({ articles, sentences, answers }: Props) => {
  const [opti_articles, removeArticle] = useOptimistic<ArticleView[], number>(
    articles,
    (state, id) => state.filter((item) => item.id !== id)
  );
  return (
    <div className='grid gap-4'>
      <div className='text-2xl font-extrabold'>Article List</div>
      <div>
        <Link href='/mng/article/new' className={buttonVariants()}>
          Create New Article
        </Link>
      </div>
      <div className='grid'>
        {opti_articles.map((article) => (
          <MngArticleListRow
            key={article.id}
            article={article}
            removeArticle={removeArticle}
            sentences={sentences.filter((s) => s.articleId === article.id)}
            answers={answers.filter((a) => a.articleId === article.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default MngArticleList;
