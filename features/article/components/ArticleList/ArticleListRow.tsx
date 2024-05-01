import { Headphones } from 'lucide-react';
import Link from 'next/link';
import { Article } from '../../schema';
import { getYMDFromDateString } from '../../services/utils';

const ArticleListRow = ({ article }: { article: Article }) => {
  const { year, month, day } = getYMDFromDateString(article.date);
  return (
    <Link
      href={`/article/${article.id}`}
      className='bg-white/60 p-5 rounded-lg block'
    >
      <div>
        <div className='text-xs '>
          <span>{year}</span>
          <span>年</span>
          <span>{month}</span>
          <span>月</span>
          <span>{day}</span>
          <span>日</span>
        </div>
        <div className='flex items-center justify-between'>
          <div>{article.title}</div>
          {article.isShowAccents ? <Headphones className='h-4 w-4' /> : null}
        </div>
      </div>
    </Link>
  );
};

export default ArticleListRow;
