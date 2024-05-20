import { MODE, REDRAW, SEGMENT } from '../../constants';
import { Box } from '../Box';
import { DraggableField } from './DraggableField';

export function handleMouseDown(e: MouseEvent, field: DraggableField) {
  const dpr = window.devicePixelRatio || 1;
  const { offsetX: x, offsetY: y } = e;
  const _x = x / dpr;
  const _y = y / dpr;

  const obj = field._findBoxInBounds(_x, _y); // ポインターの下にあるオブジェクトを抽出

  switch (field.mode) {
    case MODE.new:
      handleMouseDown_new(field, obj, _x, _y);
      return;
    case MODE.shift:
      handleMouseDown_shift(field, obj, _x, _y);
      return;
    case MODE.highlight:
      handleMouseDown_highlight(field, obj);
      return;
    default:
  }
}

function handleMouseDown_new(
  field: DraggableField,
  obj: Box | undefined,
  _x: number,
  _y: number
) {
  // 下にオブジェクトがなければ add
  if (!obj) {
    field.add(_x, _y);
    field.redraw(REDRAW.add);
    return;
  }

  const segment = obj.getSegment(_x);

  switch (segment) {
    case SEGMENT.header:
      field.select(obj);
      return;
    case SEGMENT.body:
      field.expand(obj, _x, _y);
      return;
    case SEGMENT.handle:
      field.grab(obj, _x, _y);
      return;
    default:
  }
}

function handleMouseDown_shift(
  field: DraggableField,
  obj: Box | undefined,
  _x: number,
  _y: number
) {
  // 下にオブジェクトがなければ終了
  if (!obj) return;

  const segment = obj.getSegment(_x);
  switch (segment) {
    case SEGMENT.header:
      field.delete(obj.id);
      return;
    case SEGMENT.body:
      field.divide(obj);
      return;
    default:
  }
}

function handleMouseDown_highlight(
  field: DraggableField,
  obj: Box | undefined
) {
  // 下にオブジェクトがなければ終了
  if (!obj) return;

  // 選ばれたオブジェクトのハイライトをリセット
  field.highlights[obj.id] = [];
  obj.dehighlight();
  field.redraw(REDRAW.dehighlight);
}
