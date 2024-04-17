'use client';
import { buttonVariants } from '@/components/ui/button';
import { AppUser } from '@/features/user/schema';
import Link from 'next/link';
import { useOptimistic } from 'react';
import { Article } from '../../schema';
import MngArticleListRow from './MngArticleListRow';

type Props = {
  articles: Article[];
  users: AppUser[];
};

const MngArticleList = ({ articles, users }: Props) => {
  const [opti_articles, removeArticle] = useOptimistic<Article[], number>(
    articles,
    (state, id) => state.filter((item) => item.id !== id)
  );
  return (
    <>
      <div className='text-2xl font-extrabold'>Article List</div>
      <Link href='/mng/article/new' className={buttonVariants()}>
        Create New Article
      </Link>
      <div>
        {opti_articles.map((article) => (
          <MngArticleListRow
            key={article.id}
            article={article}
            display={
              users.find(({ uid }) => uid === article.uid)?.display || ''
            }
            removeArticle={removeArticle}
          />
        ))}
      </div>
    </>
  );
};

export default MngArticleList;
