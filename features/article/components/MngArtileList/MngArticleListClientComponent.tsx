'use client';
import { AppUser } from '@/features/user/schema';
import { useOptimistic } from 'react';
import { Article } from '../../schema';
import MngArticleListRow from './MngArticleListRow';

type Props = {
  articles: Article[];
  users: AppUser[];
};

const MngArticleListClientComponent = ({ articles, users }: Props) => {
  const [opti_articles, removeArticle] = useOptimistic<Article[], number>(
    articles,
    (state, id) => state.filter((item) => item.id !== id)
  );
  return (
    <div>
      {opti_articles.map((article) => (
        <MngArticleListRow
          key={article.id}
          article={article}
          display={users.find(({ uid }) => uid === article.uid)?.display || ''}
          removeArticle={removeArticle}
        />
      ))}
    </div>
  );
};

export default MngArticleListClientComponent;
