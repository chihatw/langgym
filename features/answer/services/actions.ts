'use server';

import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { ArticlePitchQuizAnswerRow } from '../schema';

export async function insertQuizAnswers(
  quizId: number,
  rows: Omit<ArticlePitchQuizAnswerRow, 'id' | 'created_at' | 'answerId'>[]
): Promise<{ errMsg?: string; answerId?: number }> {
  const supabase = createSupabaseServerActionClient();
  const { data: _answer, error: error_a } = await supabase
    .from('article_pitch_quiz_answers')
    .insert({ quizId })
    .select()
    .single();

  if (error_a) {
    return { errMsg: error_a.message };
  }

  if (!_answer) {
    return { errMsg: 'answer had not created' };
  }

  const { error: error_r } = await supabase
    .from('article_pitch_quiz_answer_rows')
    .insert(rows.map((item) => ({ ...item, answerId: _answer.id })));

  if (error_r) {
    return { errMsg: error_r.message };
  }

  revalidatePath('/');
  revalidatePath(`/mng/answer/list`);
  return { answerId: _answer.id };
}

export async function deleteAnswer(id: number) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('article_pitch_quiz_answers')
    .delete()
    .eq('id', id);

  if (error) {
    return error.message;
  }
  revalidatePath('/');
  revalidatePath('/mng/answer/list');
}
