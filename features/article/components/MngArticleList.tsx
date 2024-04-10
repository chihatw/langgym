import { Article } from '../schema';
import MngArticleListRow from './MngArticleListRow';

type Props = {
  articles: Article[];
};

const MngArticleList = ({ articles }: Props) => {
  return (
    <div>
      {articles.map((article) => (
        <MngArticleListRow key={article.id} article={article} />
      ))}
    </div>
  );
};

export default MngArticleList;
