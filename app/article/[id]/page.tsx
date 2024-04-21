import Breadcrumb from '@/components/Breadcrumb';
import ArticlePane from '@/features/article/components/ArticlePane/ArticlePane';
import { fetchSentencesByArticleId } from '@/features/article/services/server';
import { getUserFromServerSide } from '@/features/auth/services/server';

type Props = {
  params: { id: number };
};

const ArticlePage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return <></>;

  const sentences = await fetchSentencesByArticleId(id);
  const sentence = sentences.at(0);
  if (!sentence) return <></>;

  const { uid } = sentence;
  if (!uid) return <></>;

  if (uid !== user.id) return <></>;

  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label='作文' />
      <ArticlePane sentences={sentences} />
    </div>
  );
};

export default ArticlePage;
