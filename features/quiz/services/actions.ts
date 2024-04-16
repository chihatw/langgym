'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { ArticlePitchQuestion, ArticlePitchQuiz } from '../schema';

export async function insertQuiz(
  quiz: Omit<ArticlePitchQuiz, 'id' | 'created_at' | 'hasAudio'>,
  questions: Omit<ArticlePitchQuestion, 'id' | 'created_at' | 'quizId'>[]
) {
  const supabase = createSupabaseServerActionClient();

  const { data, error } = await supabase
    .from('article_pitch_quizzes')
    .insert(quiz)
    .select();
  if (error) {
    return error.message;
  }
  const _quiz = data.at(0);
  if (!_quiz) {
    return 'quiz had not created';
  }

  const { data: _data, error: _error } = await supabase
    .from('article_pitch_quiz_questions')
    .insert(
      questions.map((item) => ({
        ...item,
        quizId: _quiz.id,
        lockedIndexes: JSON.stringify(item.lockedIndexes),
      }))
    );

  if (_error) {
    return _error.message;
  }

  revalidatePath(`/mng/quiz/list`);
}
