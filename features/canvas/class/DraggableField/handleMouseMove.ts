import { MODE, REDRAW } from '../../constants';
import { DraggableField } from './DraggableField';

export function handleMouseMove(e: MouseEvent, field: DraggableField) {
  const dpr = window.devicePixelRatio || 1;
  const { offsetX: x, offsetY: y } = e;
  const _x = x / dpr;
  const _y = y / dpr;

  const obj = field._findBoxInBounds(_x, _y); // ポインターの下にあるオブジェクトを抽出

  switch (field.mode) {
    case MODE.new:
      field.drag(_x, _y);
      return;
    case MODE.shift:
      if (!obj) return;
      field.split(obj, _x, _y);
      return;
    case MODE.highlight:
      handleMouseMove_highlight(field, _x, _y);
      return;
    default:
  }
}

function handleMouseMove_highlight(
  field: DraggableField,
  _x: number,
  _y: number
) {
  let highlights: { [boxId: number]: number[] } = {};
  for (const obj of field.objs) {
    highlights[obj.id] = obj.highlighting(_x, _y);
  }

  if (JSON.stringify(field.highlights) !== JSON.stringify(highlights)) {
    field.highlights = highlights;
    field.redraw(REDRAW.highlight);
  }
}
