import { MODE } from '../../constants';
import { Box } from '../Box';
import { DraggableField } from './DraggableField';

export function handleMouseUp(e: MouseEvent, field: DraggableField) {
  const dpr = window.devicePixelRatio || 1;
  const { offsetX: x, offsetY: y } = e;
  const _x = x / dpr;
  const _y = y / dpr;

  const obj = field._findBoxInBounds(_x, _y); // ポインターの下にあるオブジェクトを抽出
  switch (field.mode) {
    case MODE.new:
      handleMouseUp_new(field, obj, _x, _y);
      return;

    default:
  }
}

function handleMouseUp_new(
  field: DraggableField,
  obj: Box | undefined,
  _x: number,
  _y: number
) {
  // ドラッグしていなければ、終了
  if (!field.dragObj) return;

  // expand ではない場合、単純にドラッグ終了
  if (!field.expandObj) {
    field.ungrab();
    return;
  }

  // expand, connect はかならず カーソルの下に ojb がある
  if (!obj) return;

  // expand
  if (!field.expandObj.isHidden) {
    field.completeExpand();
    return;
  }

  // connect
  field.connect(obj);
}
