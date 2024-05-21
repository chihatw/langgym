import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { CanvasBox_New, CanvasLine } from '../schema';

export async function fetchBoxes(): Promise<CanvasBox_New[]> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase.from('canvas_boxes').select();
  if (error) {
    console.error(error.message);
    return [];
  }

  return data;
}

export async function insertBox({
  id,
  x,
  y,
  label,
  splitBy,
  highlights,
  isHidden,
}: CanvasBox_New) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.from('canvas_boxes').insert({
    id,
    x: x >> 0,
    y: y >> 0,
    label,
    splitBy,
    highlights,
    isHidden,
  });

  if (error) {
    console.error(error.message);
    return;
  }
}

export async function updateBox({
  id,
  x,
  y,
  label,
  splitBy,
  highlights,
  isHidden,
}: CanvasBox_New) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('canvas_boxes')
    .update({
      x: x >> 0, // SHIFT演算子による整数への変更 https://www.delftstack.com/ja/howto/javascript/javascript-float-to-int/
      y: y >> 0,
      label,
      splitBy,
      highlights,
      isHidden,
    })
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

export async function updateHighlights(id: number, highlights: number[]) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('canvas')
    .update({ highlights })
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }
}

export async function deleteBox(id: number) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.from('canvas_boxes').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    return;
  }

  // todo delete Connection lines
}

export async function updateLine({
  id,
  startX,
  startY,
  endX,
  endY,
  startObjId,
  startCharIndex,
  endObjId,
  endCharIndex,
}: CanvasLine) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('canvas_lines')
    .update({
      startX: startX >> 0,
      startY: startY >> 0,
      endX: endX >> 0,
      endY: endY >> 0,
      startObjId,
      startCharIndex,
      endObjId,
      endCharIndex,
    })
    .eq('id', id);

  if (error) {
    console.error(error.message);
    return;
  }
}

export async function deleteLine(id: number) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.from('canvas_lines').delete().eq('id', id);
  if (error) {
    console.error(error.message);
    return;
  }
}

export async function clearCanvas() {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase.from('canvas').delete().neq('id', 0);
  if (error) {
    console.error(error.message);
  }
  const { error: error_l } = await supabase
    .from('canvas_lines')
    .delete()
    .neq('id', 0);
  if (error_l) {
    console.error(error_l);
  }

  // channel.on delete でうまく subscribe できなかったために
  const { error: error_all_delete } = await supabase
    .from('canvas_all_delete')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', 1);
  if (error_all_delete) {
    console.error(error_all_delete);
  }
}
