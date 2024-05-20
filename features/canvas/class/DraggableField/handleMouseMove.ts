import { MODE, REDRAW } from '../../constants';
import { boxCollision } from '../../services/utils';
import { DraggableField } from './DraggableField';

export function handleMouseMove(e: MouseEvent, field: DraggableField) {
  const dpr = window.devicePixelRatio || 1;
  const { offsetX: x, offsetY: y } = e;
  const _x = x / dpr;
  const _y = y / dpr;

  switch (field.mode) {
    case MODE.new:
      handleMouseMove_new(field, _x, _y);
      return;
    case MODE.shift:
      handleMouseMove_shift(field, _x, _y);
      return;
    case MODE.highlight:
      handleMouseMove_highlight(field, _x, _y);
      return;
    default:
  }
}

function handleMouseMove_new(field: DraggableField, _x: number, _y: number) {
  // ドラッグオブジェクトがなければ、終了
  if (!field.dragObj) return;

  // expandObj, expandStart がある場合、 expand に hidden をつけるかどうか判断
  if (field.expandObj && field.expandStartObj) {
    if (field.expandObj.lineEndX > field.expandStartObj.lineStartX) {
      // expandObj が expandStartObj より後方に行った場合、描画しない
      field.expandObj.isHidden = true;

      // expandObj が expandStartObj に接している時、描画しない
    } else if (boxCollision(field.expandObj, field.expandStartObj)) {
      field.expandObj.isHidden = true;
    } else {
      field.expandObj.isHidden = false;
    }
  }

  field.dragObj.dragging(_x - field.dragDX, _y - field.dragDY);
  field.redraw(REDRAW.dragging);
}

function handleMouseMove_shift(field: DraggableField, _x: number, _y: number) {
  let splitBy = 0;
  for (const obj of field.objs) {
    const _splitBY = obj.splitting(_x, _y);
    if (_splitBY) splitBy = _splitBY;
  }

  if (field.splitBy !== splitBy) {
    field.splitBy = splitBy;
    field.redraw(REDRAW.split);
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
