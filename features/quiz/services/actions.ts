'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { ArticlePitchQuestion, ArticlePitchQuiz } from '../schema';

export async function insertQuiz(
  quiz: Omit<ArticlePitchQuiz, 'id' | 'created_at' | 'hasAudio' | 'isDev'>,
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

export async function updateQuiz_Questions(
  quizId: number,
  title: string,
  questions: ArticlePitchQuestion[],
  isUpdateQuiz: boolean,
  isUpdateQuestions: boolean
) {
  const supabase = createSupabaseServerActionClient();

  if (isUpdateQuiz) {
    const { error } = await supabase
      .from('article_pitch_quizzes')
      .update({ title })
      .eq('id', quizId);

    if (error) {
      return error.message;
    }
  }

  if (isUpdateQuestions) {
    const { error } = await supabase
      .from('article_pitch_quiz_questions')
      .upsert(
        questions.map((item) => ({
          ...item,
          lockedIndexes: JSON.stringify(item.lockedIndexes),
          created_at: item.created_at.toISOString(),
        }))
      );
    if (error) {
      return error.message;
    }
  }

  revalidatePath(`/mng/quiz/list`);
  revalidatePath(`/mng/quiz/${quizId}`);
}

export async function updateQuizIsDev(id: number, isDev: boolean) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('article_pitch_quizzes')
    .update({ isDev })
    .eq('id', id);

  if (error) {
    return error.message;
  }
  revalidatePath(`/mng/quiz/list`);
}

export async function updateQuizHasAudio(id: number, hasAudio: boolean) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('article_pitch_quizzes')
    .update({ hasAudio })
    .eq('id', id);

  if (error) {
    return error.message;
  }
  revalidatePath(`/mng/quiz/list`);
}

export async function deleteQuiz(id: number) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('article_pitch_quizzes')
    .delete()
    .eq('id', id);

  if (error) {
    return error.message;
  }
  revalidatePath(`/mng/quiz/list`);
}
