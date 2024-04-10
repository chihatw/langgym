import BorderLabel from '@/components/BorderLabel';
import ArticleList from '@/features/article/components/ArticleList';
import { DUMMY_ARTICLES } from '@/features/article/constant';
import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';

type Props = {};

const ArticleListPage = async (props: Props) => {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase.auth.getSession();
  console.log(data.session?.user.id);

  // debug use dummy articles
  const articles = DUMMY_ARTICLES.filter((item) => item.uid === 'dummy').sort(
    (a, b) => b.createdAt - a.createdAt
  );

  console.log(articles);

  return (
    <div className='space-y-4'>
      <BorderLabel label='最近の作文' />
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticleListPage;
