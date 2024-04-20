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
        <div className='text-xs font-extralight'>
          <span>{year}</span>
          <span>年</span>
          <span>{month}</span>
          <span>月</span>
          <span>{day}</span>
          <span>日</span>
        </div>
        <div>{article.title}</div>
      </div>
    </Link>
  );
};

export default ArticleListRow;
