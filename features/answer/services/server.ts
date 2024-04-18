import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import {
  ArticlePitchQuizAnswerRowView,
  ArticlePitchQuizAnswerView,
} from '../schema';

export async function fetchAnswers(
  limit: number = 10
): Promise<ArticlePitchQuizAnswerView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('article_pitch_quiz_answer_view')
    .select()
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.log(error);
    return [];
  }

  if (!data) {
    console.log('no data');
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchAnswerRowsbyArticleIds(
  answerIds: number[]
): Promise<undefined | ArticlePitchQuizAnswerRowView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('article_pitch_quiz_answer_rows_view')
    .select()
    .in('answerId', answerIds)
    .order('answerId')
    .order('line');

  if (error) {
    console.log(error.message);
    return;
  }

  return data.map((item) => ({
    ...item,
    lockedIndexes: item.lockedIndexes ? JSON.parse(item.lockedIndexes) : null,
  }));
}
