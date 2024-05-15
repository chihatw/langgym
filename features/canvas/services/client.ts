import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { CanvasBox } from '../schema';

export async function fetchCanvas(): Promise<CanvasBox[]> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase.from('canvas').select();

  if (error) {
    console.error(error.message);
    return [];
  }

  return data;
}

export async function insertBox({ id, x, y, label, splitBy }: CanvasBox) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.from('canvas').insert({
    id,
    x: x >> 0,
    y: y >> 0,
    label,
    splitBy,
  });

  if (error) {
    console.error(error.message);
    return;
  }
}

export async function updateBoxXY(id: number, x: number, y: number) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('canvas')
    .update({
      x: x >> 0, // SHIFT演算子による整数への変更 https://www.delftstack.com/ja/howto/javascript/javascript-float-to-int/
      y: y >> 0,
    })
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }
}

export async function updateBoxLabel(id: number, label: string) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('canvas')
    .update({ label })
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }
}

export async function updateSplitBy(id: number, splitBy: number) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('canvas')
    .update({ splitBy })
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }
}

export async function deleteAllBoxes() {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.from('canvas').delete().neq('id', 0);
  if (error) {
    console.error(error.message);
    return;
  }
}

export async function deleteBox(id: number) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.from('canvas').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    return;
  }
}
