import Breadcrumb from '@/components/Breadcrumb';
import HiddenElements from '@/components/HiddenElements';
import ArticlePane from '@/features/article/components/ArticlePane/ArticlePane';
import { fetchSentencesByArticleId_Uid } from '@/features/article/services/server';
import { getUserFromServerSide } from '@/features/auth/services/server';

type Props = {
  params: { id: number };
};

const ArticlePage = async ({ params: { id } }: Props) => {
  const user = await getUserFromServerSide();
  if (!user) return null;

  const sentences = await fetchSentencesByArticleId_Uid(id, user.id);
  if (!sentences.length) return null;

  return (
    <>
      <div className='grid gap-4 max-w-lg mx-auto pt-4 pb-40'>
        <Breadcrumb label='作文' />
        <ArticlePane sentences={sentences} />
      </div>
      <HiddenElements uid={user.id} />
    </>
  );
};

export default ArticlePage;
