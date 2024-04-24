'use server';
import { createSupabaseServerActionClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import {
  Workout,
  WorkoutFirstAudioPath,
  WorkoutItem,
  WorkoutSecondAudioPath,
} from '../schema';

function revalidatePath_workout(id: number) {
  revalidatePath('/');
  revalidatePath('/mng/workout/list');
  revalidatePath(`/workout/${id}`);
  revalidatePath(`/mng/workout/${id}/edit`);
  revalidatePath(`/mng/workout/${id}/items`);
}

export async function insertWorkout(
  workout: Omit<Workout, 'id' | 'created_at' | 'isDev' | 'isReview'>
) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase.from('workouts').insert(workout);

  if (error) {
    return error.message;
  }

  revalidatePath('/');
  revalidatePath('/mng/workout/list');
  return;
}

export async function updateWorkout(
  id: number,
  workout: Omit<Workout, 'id' | 'created_at' | 'isDev' | 'isReview'>
) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('workouts')
    .update(workout)
    .eq('id', id);

  if (error) {
    return error.message;
  }

  revalidatePath_workout(id);
  return;
}

export async function updateWorkoutIsDev(workoutId: number, isDev: boolean) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('workouts')
    .update({ isDev })
    .eq('id', workoutId);

  if (error) {
    return error.message;
  }

  revalidatePath_workout(workoutId);
  return;
}

export async function updateWorkoutIsReview(
  workoutId: number,
  isReview: boolean
) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('workouts')
    .update({ isReview })
    .eq('id', workoutId);

  if (error) {
    return error.message;
  }

  revalidatePath_workout(workoutId);
  return;
}

export async function deleteWorkout(id: number) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase.from('workouts').delete().eq('id', id);

  if (error) {
    console.log(error.message);
    return;
  }

  revalidatePath('/');
  revalidatePath('/mng/workout/list');
  return;
}

export async function batchInsertWorkoutItems(
  workoutId: number,
  items: Omit<WorkoutItem, 'id' | 'created_at'>[]
) {
  const supabase = createSupabaseServerActionClient();

  // 既存の workoutItems を削除
  const { error } = await supabase
    .from('workout_items')
    .delete()
    .eq('workoutId', workoutId);

  if (error) {
    return error.message;
  }

  // 新規作成
  const { error: _error } = await supabase.from('workout_items').insert(items);
  if (_error) {
    return _error.message;
  }
  revalidatePath('/');
  revalidatePath(`/workout/${workoutId}`);
  revalidatePath(`/mng/workout/${workoutId}/items`);
  revalidatePath(`/mng/workout/${workoutId}/edit`);
  return;
}

export async function insertWorkoutFirstAudioPath(
  item: Omit<WorkoutFirstAudioPath, 'id'>
) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('workout_first_audio_paths')
    .insert(item)
    .select()
    .single();

  if (error) {
    return error.message;
  }

  revalidatePath('/');
  revalidatePath('/workout/1');
}

export async function insertWorkoutSecondAudioPath(
  item: Omit<WorkoutSecondAudioPath, 'id'>
) {
  const supabase = createSupabaseServerActionClient();
  const { error } = await supabase
    .from('workout_second_audio_paths')
    .insert(item)
    .select()
    .single();

  if (error) {
    return error.message;
  }

  revalidatePath('/');
  revalidatePath('/workout/2');
  revalidatePath('/workout/3');
}

export async function deleteWorkoutFirstAudioPathByItemId(itemId: number) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('workout_first_audio_paths')
    .delete()
    .eq('itemId', itemId);

  if (error) {
    console.log(error.message);
    return;
  }

  revalidatePath('/');
  revalidatePath('/workout/1');
}

export async function deleteWorkoutSecondAudioPath(id: number) {
  const supabase = createSupabaseServerActionClient();

  const { error } = await supabase
    .from('workout_second_audio_paths')
    .delete()
    .eq('id', id);

  if (error) {
    console.log(error.message);
    return;
  }

  revalidatePath('/');
  revalidatePath('/workout/2');
  revalidatePath('/workout/3');
}
