import { Article } from '@/features/article/schema';
import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { ArticlePitchQuiz } from '../schema';

export async function fetchArticlePitchQuizzes(
  limit: number
): Promise<{ quizzes: ArticlePitchQuiz[]; articles: Article[] }> {
  const supabase = createSupabaseServerComponentClient();
  const { data, error } = await supabase
    .from('article_pitch_quizzes')
    .select()
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.log(error.message);
    return { quizzes: [], articles: [] };
  }
  const articleIds = data.map((item) => item.articleId);
  const articleIds_uniq = Array.from(new Set(articleIds));

  const { data: _data, error: _error } = await supabase
    .from('articles')
    .select()
    .in('id', articleIds_uniq);

  if (_error) {
    console.log(_error.message);
    return { quizzes: [], articles: [] };
  }

  return {
    quizzes: data.map((item) => ({
      ...item,
      created_at: new Date(item.created_at),
    })),
    articles: _data.map((item) => ({
      ...item,
      created_at: new Date(item.created_at),
    })),
  };
}
