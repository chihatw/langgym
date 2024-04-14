import { Article } from '../../schema';
import ArticleListRow from './ArticleListRow';

type Props = { articles: Article[] };

const ArticleList = ({ articles }: Props) => {
  return (
    <div className='space-y-4'>
      {articles.map((article, index) => (
        <ArticleListRow key={index} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
