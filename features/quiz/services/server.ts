import { createClient } from '@/utils/supabase/server';
import { ArticlePitchQuestionView, ArticlePitchQuizView } from '../schema';

export async function fetchArticlePitchQuizzes(
  limit: number
): Promise<ArticlePitchQuizView[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('article_pitch_quizzes_view')
    .select()
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) return [];

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchArticlePitchQuizzesByUid(
  uid: string
): Promise<ArticlePitchQuizView[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('article_pitch_quizzes_view')
    .select()
    .eq('uid', uid)
    .eq('isDev', false)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) return [];

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchArticlePitchQuizQuestions(
  quizId: number
): Promise<ArticlePitchQuestionView[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('article_pitch_quiz_questions_view')
    .select()
    .eq('quizId', quizId)
    .order('line');

  if (error) {
    console.error(error.message);
    return [];
  }

  return data;
}
