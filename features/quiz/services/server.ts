import { Article, Sentence } from '@/features/article/schema';
import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { ArticlePitchQuestion, ArticlePitchQuiz } from '../schema';

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

export async function fetchArticlePitchQuiz(quizId: number): Promise<{
  quiz: ArticlePitchQuiz | null;
  sentences: Sentence[];
  questions: ArticlePitchQuestion[];
}> {
  const supabase = createSupabaseServerComponentClient();

  // quiz
  const { data: _quiz, error: error_q } = await supabase
    .from('article_pitch_quizzes')
    .select()
    .eq('id', quizId)
    .single();

  if (error_q) {
    console.log(error_q);
    return { quiz: null, sentences: [], questions: [] };
  }

  const quiz: ArticlePitchQuiz = {
    ..._quiz,
    created_at: new Date(_quiz.created_at),
  };

  // sentences
  const { data: _sentences, error: error_s } = await supabase
    .from('sentences')
    .select()
    .eq('articleId', quiz.articleId)
    .order('line');

  if (error_s) {
    console.log(error_s);
    return { quiz: null, sentences: [], questions: [] };
  }

  const sentences: Sentence[] = _sentences.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));

  // questions
  const { data: _questions, error: error_qs } = await supabase
    .from('article_pitch_quiz_questions')
    .select()
    .eq('quizId', quizId);

  if (error_qs) {
    console.log(error_qs);
    return { quiz: null, sentences: [], questions: [] };
  }

  const questions: ArticlePitchQuestion[] = _questions.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
    lockedIndexes: JSON.parse(item.lockedIndexes),
  }));

  return { quiz, sentences, questions };
}
