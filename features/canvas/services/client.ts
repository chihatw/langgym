import { createSupabaseClientComponentClient } from '@/lib/supabase';
import { CANVAS_FIELD_ID } from '../constants';
import { CanvasBox, CanvasField } from '../schema';
import { connectedObjSetsStringify } from './utils';

export async function fetchField(): Promise<undefined | CanvasField> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase
    .from('canvas_field')
    .select()
    .eq('id', CANVAS_FIELD_ID)
    .single();
  if (error) {
    console.error(error.message);
    return;
  }

  return data;
}

export async function fetchBoxes(): Promise<CanvasBox[]> {
  const supabase = createSupabaseClientComponentClient();
  const { data, error } = await supabase.from('canvas_boxes').select();
  if (error) {
    console.error(error.message);
    return [];
  }

  return data;
}

export async function updateField({
  id,
  expandObjId,
  expandStartObjId,
  connectedObjSets,
}: Omit<CanvasField, 'connectedObjSets'> & { connectedObjSets: number[][] }) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('canvas_field')
    .update({
      expandObjId,
      expandStartObjId,
      connectedObjSets: connectedObjSetsStringify(connectedObjSets),
    })
    .eq('id', id);

  if (error) {
    console.error(error.message);
  }
}

export async function insertBox({
  id,
  x,
  y,
  label,
  splitBy,
  highlights,
  isHidden,
}: CanvasBox) {
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
}: CanvasBox) {
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

//
export async function updateHighlights(id: number, highlights: number[]) {
  const supabase = createSupabaseClientComponentClient();
  const { error } = await supabase
    .from('canvas_boxes')
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
}

export async function clearCanvas() {
  const supabase = createSupabaseClientComponentClient();

  // field
  const { error: error_f } = await supabase
    .from('canvas_field')
    .update({ expandObjId: null, expandStartObjId: null })
    .eq('id', CANVAS_FIELD_ID);
  if (error_f) {
    console.error(error_f.message);
  }

  // box
  const { error: error_b } = await supabase
    .from('canvas_boxes')
    .delete()
    .neq('id', 0);
  if (error_b) {
    console.error(error_b.message);
  }
}
