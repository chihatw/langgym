import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import {
  BetterReadImagePathView,
  BetterReadItem,
  BetterReadItemQuestion,
  BetterReadView,
} from '../schema';

export async function fetchBetterreads(): Promise<BetterReadImagePathView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_image_paths_view')
    .select();

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchBetterreadImagePathByUid(
  uid: string
): Promise<BetterReadImagePathView | undefined> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_image_paths_view')
    .select()
    .eq('uid', uid)
    .limit(1)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  if (!data) {
    return;
  }

  return {
    ...data,
    created_at: new Date(data.created_at!),
  };
}

export async function fetchBetterreadImagePathsById(
  id: number
): Promise<BetterReadImagePathView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_image_paths_view')
    .select()
    .eq('betterreadId', id)
    .order('index');

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at!),
  }));
}

export async function fetchBetterreadViews(
  id: number
): Promise<BetterReadView[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_view')
    .select()
    .eq('id', id)
    .order('line');

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item,
  }));
}

export async function fetchBetterreadItems(
  betterread_id: number
): Promise<BetterReadItem[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_items')
    .select()
    .eq('betterread_id', betterread_id)
    .order('created_at');

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));
}

export async function fetchBetterreadItemQuestions(
  betterread_item_ids: number[]
): Promise<BetterReadItemQuestion[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread_item_questions')
    .select()
    .in('betterread_item_id', betterread_item_ids)
    .order('created_at');

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    created_at: new Date(item.created_at),
  }));
}
