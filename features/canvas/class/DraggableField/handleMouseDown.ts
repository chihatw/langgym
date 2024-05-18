import { FONT_SIZE, MODE } from '../../constants';
import { deleteBox, deleteLine, insertLine } from '../../services/client';
import { Box } from '../Box';
import { Line } from '../Line';
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
    case MODE.highlight:
      handleMouseDown_highlight(field, obj);
      return;
    case MODE.select:
      handleMouseDown_select(field, obj);
      return;
    case MODE.split:
      handleMouseDown_split(field, obj);
      return;
    case MODE.connect:
      handleMouseDown_connect(field, obj, _x, _y);
      return;
    case MODE.expand:
      handleMouseDown_expand(field, obj, _x, _y);
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
    field.redraw('add');
    return;
  }

  // todo
  const segment = obj.getSegment(_x);
  switch (segment) {
    case 'header':
      // 文字を入力可能にする
      // mode shift の時は、delete box
      return;
    case 'body':
      // connect / expand
      return;
    case 'handle':
      //  drag
      field.grab(obj, _x - obj.x, _y - obj.y);

      if (!field.dragObj) throw new Error();
      field.dragObj.dragging(_x - field.dragDX, _y - field.dragDY);

      field.redraw('grab');
      return;
    default:
  }
}

// will delete
function handleMouseDown_drag(
  field: DraggableField,
  obj: Box | undefined,
  _x: number,
  _y: number
) {
  // 下にオブジェクトがない場合
  if (!obj) {
    // 選択がなければ、そのまま終了
    if (!field.selectObj) return;

    // 選択があれば、deselect()
    field.deselect();
    field.redraw('grab');
    return;
  }

  field.grab(obj, _x - obj.x, _y - obj.y);
  if (!field.dragObj) throw new Error();
  field.dragObj.dragging(_x - field.dragDX, _y - field.dragDY);
  field.redraw('grab');
  return;
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
  field.redraw('grab');
}

function handleMouseDown_select(field: DraggableField, obj: Box | undefined) {
  // 下にオブジェクトがない、かつ選択オブジェクトもない場合、終了
  if (!obj && !field.selectObj) return;

  // 選択オブジェクトがあれば deselect()
  if (field.selectObj) field.deselect();

  // 下にオブジェクトがある、かつ選択オブジェクトと違う場合 select()
  if (!!obj && (!field.selectObj || field.selectObj.id !== obj.id)) {
    field.select(obj);
  }
  field.redraw('select');
}

function handleMouseDown_split(field: DraggableField, obj: Box | undefined) {
  // splitBy が 0 または下にオブジェクトがなければ終了
  if (!field.splitBy || !obj) return;

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

  // connected line の更新
  field.connectedLines = field.connectedLines.map((l) => {
    // 関係があった場合は、objId, charIndex を更新
    if (l.startObjId === obj.id) {
      const newStartObj = l.startCharIndex < field.splitBy ? box1 : box2;
      const newStartCharIndex =
        l.startCharIndex < field.splitBy
          ? l.startCharIndex
          : l.startCharIndex - field.splitBy;
      return new Line(
        newStartObj.nthCenterX(newStartCharIndex),
        newStartObj.nthCenterY(newStartCharIndex),
        l.endX,
        l.endY,
        newStartObj.id,
        newStartCharIndex,
        l.endObjId,
        l.endCharIndex,
        l.id
      );
    }

    // 関係があった場合は、objId, charIndex を更新
    if (l.endObjId === obj.id) {
      const newEndObj = l.endCharIndex! < field.splitBy ? box1 : box2;
      const newEndCharIndex =
        l.endCharIndex! < field.splitBy
          ? l.endCharIndex!
          : l.endCharIndex! - field.splitBy;
      return new Line(
        l.startX,
        l.startY,
        newEndObj.nthCenterX(newEndCharIndex),
        newEndObj.nthCenterY(newEndCharIndex),
        l.startObjId,
        l.startCharIndex,
        newEndObj.id,
        newEndCharIndex,
        l.id
      );
    }

    return l;
  });

  // 関連 highlights の削除
  const clone = { ...field.highlights };
  delete clone[obj.id];
  field.highlights = clone;

  // splitBy のリセット
  field.splitBy = 0;

  field.redraw('divide');
  return;
}

function handleMouseDown_connect(
  field: DraggableField,
  obj: Box | undefined,
  _x: number,
  _y: number
) {
  // 下にオブジェクトがなければ、終了
  if (!obj) return;

  // 下に char がなければ、終了
  const index = obj.indexOf(_x, _y);
  if (index < 0) return;

  // connectedLines に 含まれていれば、削除する
  field.connectedLines = field.connectedLines.filter((l) => {
    if (![l.startObjId, l.endObjId].includes(obj.id)) {
      return true;
    }
    // remote フィルターで除外すると同時にリモートも削除
    deleteLine(l.id);
    // canvas
    return false;
  });

  field.connectStartObjId = obj.id;
  field.connectStartCharIndex = index;
}

function handleMouseDown_expand(
  field: DraggableField,
  obj: Box | undefined,
  _x: number,
  _y: number
) {
  // 下にオブジェクトがなければ、終了
  if (!obj) return;

  // 下に char がなければ、終了
  const index = obj.indexOf(_x, _y);
  if (index < 0) return;

  // のっていれば、新しいboxを作成
  const box = new Box(obj.x - FONT_SIZE / 2, obj.y - FONT_SIZE / 2, '', 0, []);
  field.objs = [...field.objs, box];
  field.grab(box, _x - box.x, _y - box.y);

  // 新しいboxとcharをconnected line で結ぶ
  // 新しいbox は char を持っていないので、 index: -1 , box の中心から線を延ばす
  const line = new Line(
    box.nthCenterX(-1),
    box.nthCenterY(-1),
    obj.nthCenterX(index),
    obj.nthCenterY(index),
    box.id,
    -1,
    obj.id,
    index
  );

  // connectedLines を追加
  field.connectedLines = [...field.connectedLines, line];

  // remote
  insertLine(line);

  field.redraw('expand');
}
