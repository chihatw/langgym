import Breadcrumb from '@/components/Breadcrumb';
import ArticlePane from '@/features/article/components/ArticlePane/ArticlePane';
import { fetchSentencesByArticleId_Uid } from '@/features/article/services/server';
import { getUserFromServerSide } from '@/features/auth/services/server';

type Props = {
  params: Promise<{ id: number }>;
};

const ArticlePage = async (props: Props) => {
  const params = await props.params;

  const { id } = params;

  const user = await getUserFromServerSide();
  if (!user) return null;

  const sentences = await fetchSentencesByArticleId_Uid(id, user.id);
  if (!sentences.length) return null;

  return (
    <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
      <Breadcrumb label='作文' />
      <ArticlePane sentences={sentences} />
    </div>
  );
};

export default ArticlePage;
