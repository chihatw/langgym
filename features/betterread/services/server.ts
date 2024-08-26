import { createSupabaseServerComponentClient } from '@/lib/supabase/actions';
import { BetterRead, BetterReadItem, BetterReadItemQuestion } from '../schema';

export async function fetchBetterreads(): Promise<BetterRead[]> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase.from('betterread').select();

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

export async function fetchBetterread(
  id: number
): Promise<BetterRead | undefined> {
  const supabase = createSupabaseServerComponentClient();
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

export async function fetchBetterreadByUid(
  uid: string
): Promise<BetterRead | undefined> {
  const supabase = createSupabaseServerComponentClient();

  const { data, error } = await supabase
    .from('betterread')
    .select()
    .eq('uid', uid)
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
