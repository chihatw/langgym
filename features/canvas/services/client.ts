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

export async function updateCanvasXPosYPos(xPos: number, yPos: number) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('canvas')
    .update({ xPos, yPos })
    .eq('id', 1);

  if (error) {
    console.error(error.message);
    return;
  }
}
