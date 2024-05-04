import Breadcrumb from '@/components/Breadcrumb';
import ArticlePane from '@/features/article/components/ArticlePane/ArticlePane';
import { fetchSentencesByArticleId_Uid } from '@/features/article/services/server';
import { getUserFromServerSide } from '@/features/auth/services/server';
import PathnameLog from '@/features/log/components/PathnameLog';

type Props = {
  params: { id: number };
};

const ArticlePage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const sentences = await fetchSentencesByArticleId_Uid(id, user.id);
  const sentence = sentences.at(0);
  if (!sentence) return null;

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='作文' />
        <ArticlePane sentences={sentences} />
      </div>
      <PathnameLog uid={user.id} />
    </>
  );
};

export default ArticlePage;
