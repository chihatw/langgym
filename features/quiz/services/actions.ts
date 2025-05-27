'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { ArticlePitchQuestion, ArticlePitchQuiz } from '../schema';

export async function insertQuiz(
  quiz: Omit<ArticlePitchQuiz, 'id' | 'created_at' | 'hasAudio' | 'isDev'>,
  questions: Omit<ArticlePitchQuestion, 'id' | 'created_at' | 'quizId'>[]
) {
  const supabase = await createClient();

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
  questions: Omit<ArticlePitchQuestion, 'created_at'>[],
  isUpdateQuiz: boolean,
  isUpdateQuestions: boolean
) {
  const supabase = await createClient();

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
    let _error = '';

    for (let question of questions) {
      const { id, ...omitted } = question;
      const { error } = await supabase
        .from('article_pitch_quiz_questions')
        .update(omitted)
        .eq('id', id);
      if (error) {
        _error = error.message;
      }
    }

    if (_error) {
      return _error;
    }
  }

  revalidatePath(`/mng/quiz/list`);
  revalidatePath(`/mng/quiz/${quizId}/edit`);
}

export async function updateQuizIsDev(id: number, isDev: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('article_pitch_quizzes')
    .update({ isDev })
    .eq('id', id);

  if (error) {
    return error.message;
  }
  revalidatePath('/');
  revalidatePath(`/mng/quiz/list`);
}

export async function updateQuizHasAudio(id: number, hasAudio: boolean) {
  const supabase = await createClient();
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
  const supabase = await createClient();
  const { error } = await supabase
    .from('article_pitch_quizzes')
    .delete()
    .eq('id', id);

  if (error) {
    return error.message;
  }
  revalidatePath(`/mng/quiz/list`);
}
