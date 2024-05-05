import { createSupabaseClientComponentClient } from '@/lib/supabase';

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
