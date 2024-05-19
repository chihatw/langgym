import {
  BOX_HEIGHT,
  BOX_MIN_WIDTH,
  MODE,
  REDRAW,
  SEGMENT,
} from '../../constants';
import { deleteBox } from '../../services/client';
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
    const box = new Box(_x, _y, '', 0, []);
    field.objs = [...field.objs, box];

    _selectObjForInput(field, box);
    field.redraw(REDRAW.add);
    return;
  }

  const segment = obj.getSegment(_x);

  switch (segment) {
    case SEGMENT.header:
      // 選択オブジェクトと同じ場合、終了
      if (field.selectObj?.id === obj.id) {
        // 選択オブジェクトがあれば deselect()
        if (field.selectObj) field.deselect();
        return;
      }
      _selectObjForInput(field, obj);
      field.redraw(REDRAW.select);
      return;
    case SEGMENT.body:
      // 下に char がなければ、終了
      const index = obj.indexOf(_x, _y);
      if (index < 0) return;

      // 新しいboxを作成 ポインタの位置を中心にする
      const box = new Box(
        _x - BOX_MIN_WIDTH / 2,
        _y - BOX_HEIGHT / 2,
        '',
        0,
        []
      );
      field.objs = [...field.objs, box];
      field.connectedObjSets = [...field.connectedObjSets, [obj.id, box.id]];
      field.expand(box, obj, _x - box.x, _y - box.y);

      // todo remote insert connectedObjSet, expandObj, expandStartObj
      // insertLine(line);

      field.redraw(REDRAW.expand);

      return;
    case SEGMENT.handle:
      // 選択オブジェクトがあれば deselect()
      if (field.selectObj) field.deselect();

      field.grab(obj, _x - obj.x, _y - obj.y);

      if (!field.dragObj) throw new Error();
      field.dragObj.dragging(_x - field.dragDX, _y - field.dragDY);

      field.redraw(REDRAW.grab);
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
      field.delete(obj);
      return;
    case SEGMENT.body:
      // splitBy が 0 ならば終了
      if (!field.splitBy) return;

      // obj.divide();
      const charSets = [
        obj.label.substring(0, field.splitBy),
        obj.label.substring(field.splitBy),
      ];

      // box を新しく２つ作成
      const box1 = new Box(obj.x - 64, obj.y, charSets[0], 0, []);
      const box2 = new Box(obj.splittedX, obj.y, charSets[1], 0, []);

      // 古いオブジェクトの削除
      // local
      field.objs = [...field.objs.filter((o) => o.id !== obj.id), box2, box1];

      // remote
      deleteBox(obj.id);

      // todo divide した時の connectedObjSetsの更新

      // 関連 highlights の削除
      const clone = { ...field.highlights };
      delete clone[obj.id];
      field.highlights = clone;

      // splitBy のリセット
      field.splitBy = 0;

      field.redraw(REDRAW.divide);

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

function _selectObjForInput(field: DraggableField, obj: Box) {
  // 文字を入力可能にする
  field.select(obj);

  // input に focus する
  setTimeout(() => {
    field.focusInput();
  }, 200);
}
