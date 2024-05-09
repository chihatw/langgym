import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { Canvas } from '../schema';

export async function fetchCanvas(): Promise<Canvas | undefined> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase
    .from('canvas')
    .select()
    .eq('id', 1)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  return data;
}

export async function updateBoxXY(x: number, y: number) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('canvas')
    .update({
      x: x >> 0,
      y: y >> 0,
    })
    .eq('id', 1);

  if (error) {
    console.error(error.message);
    return;
  }
}

export async function updateBoxLabel(label: string) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.from('canvas').update({ label }).eq('id', 1);

  if (error) {
    console.error(error.message);
    return;
  }
}
