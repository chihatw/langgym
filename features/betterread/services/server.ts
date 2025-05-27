import { createClient } from '@/utils/supabase/server';
import {
  BetterRead,
  BetterReadItemQuestion,
  BetterReadItemView,
  BetterreadToggle,
  BetterReadView,
} from '../schema';

export async function fetchBetterreads(): Promise<BetterReadView[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('betterread_view').select();

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data;
}

export async function fetchBetterread(
  id: number
): Promise<BetterRead | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('betterread')
    .select()
    .eq('id', id)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  if (!data) {
    return;
  }

  return { ...data, created_at: new Date(data.created_at!) };
}

export async function fetchBetterreadsByUid(
  uid: string
): Promise<BetterRead[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('betterread')
    .select()
    .eq('uid', uid)
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

export async function fetchBetterreadItems(
  betterread_id: number
): Promise<BetterReadItemView[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('betterread_items_view')
    .select()
    .eq('betterread_id', betterread_id)
    .order('item_created_at')
    .order('question_created_at');

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((item) => ({
    ...item,
    item_created_at: new Date(item.item_created_at!),
    question_created_at: new Date(item.question_created_at!),
  }));
}

export async function fetchBetterreadItemQuestions(
  betterread_item_ids: number[]
): Promise<BetterReadItemQuestion[]> {
  const supabase = await createClient();

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

export async function fetchBetterreadToggle(): Promise<
  BetterreadToggle | undefined
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('betterread_toggle')
    .select()
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  if (!data) return;

  return data;
}
