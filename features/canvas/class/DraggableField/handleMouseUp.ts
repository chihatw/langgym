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
    field.redraw('ungrab');
    return;
  }

  // expand だが、ドラッグのオブジェクトが表示されていれば、新しく connectedObjSet を追加
  if (!field.expandObj.isHidden) {
    field.addConnectedObjSet(field.expandStartObj!.id, field.expandObj.id);
    field.ungrab();
    field.redraw('ungrab');
    return;
  }

  // エクスパンドオブジェクトが非表示の場合

  // エクスパンドで使っていた obj を削除
  field.delete(field.expandObj.id);

  if (obj && obj.id !== field.expandObj.id) {
    // expandObj 以外のオブジェクトの上にドラッグしている場合
    // 新しく connectedObjSet を追加
    field.addConnectedObjSet(field.expandStartObj!.id, obj.id);
  }

  field.ungrab();
  field.redraw('remove expand');
  return;
}
