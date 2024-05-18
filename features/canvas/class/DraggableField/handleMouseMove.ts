import { MODE } from '../../constants';
import { insertLine, updateLine } from '../../services/client';
import { Line } from '../Line';
import { DraggableField } from './DraggableField';

export function handleMouseMove(e: MouseEvent, field: DraggableField) {
  const dpr = window.devicePixelRatio || 1;
  const { offsetX: x, offsetY: y } = e;
  const _x = x / dpr;
  const _y = y / dpr;

  switch (field.mode) {
    case MODE.drag:
    case MODE.expand:
      handleMouseMove_drag(field, _x, _y);
      return;
    case MODE.split:
      handleMouseMove_split(field, _x, _y);
      return;
    case MODE.highlight:
      handleMouseMove_highlight(field, _x, _y);
      return;
    case MODE.connect:
      handleMouseMove_connect(field, _x, _y);
      return;
    case MODE.select:
    default:
  }
}

function handleMouseMove_drag(field: DraggableField, _x: number, _y: number) {
  if (!field.dragObj) return;

  field.dragObj.dragging(_x - field.dragDX, _y - field.dragDY);

  // recalc connectedLines
  field.connectedLines = field.connectedLines.map((l) => {
    // 起点終点の変更がない場合
    if (![l.startObjId, l.endObjId].includes(field.dragObj!.id)) {
      return l;
    }

    const startObj = field.objs.find((o) => o.id === l.startObjId);
    if (!startObj) throw new Error('no start obj');
    const endObj = field.objs.find((o) => o.id === l.endObjId);
    if (!endObj) throw new Error('no end obj');
    if (typeof l.endCharIndex !== 'number') throw new Error('no endCharIndex');

    const newLine = new Line(
      startObj.nthCenterX(l.startCharIndex),
      startObj.nthCenterY(l.startCharIndex),
      endObj.nthCenterX(l.endCharIndex),
      endObj.nthCenterY(l.endCharIndex),
      l.startObjId,
      l.startCharIndex,
      l.endObjId,
      l.endCharIndex,
      l.id
    );

    // remote
    updateLine(newLine);

    // canvas
    return newLine;
  });

  field.redraw('dragging');
}

function handleMouseMove_split(field: DraggableField, _x: number, _y: number) {
  let splitBy = 0;
  for (const obj of field.objs) {
    const _splitBY = obj.splitting(_x, _y);
    if (_splitBY) splitBy = _splitBY;
  }

  if (field.splitBy !== splitBy) {
    field.splitBy = splitBy;
    field.redraw('split');
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
    field.redraw('highlight');
  }
}

function handleMouseMove_connect(
  field: DraggableField,
  _x: number,
  _y: number
) {
  // start obj id がない場合は終了
  if (!field.connectStartObjId) return;

  const targetObj = field.objs.find((o) => o.id === field.connectStartObjId);
  if (!targetObj) throw new Error();

  // すでにdrawingLine がある場合
  if (field.drawingLine) {
    const line = new Line(
      targetObj.nthCenterX(field.connectStartCharIndex), // index: -1 の時は box の中央　// 使いまわせる？
      targetObj.nthCenterY(field.connectStartCharIndex), // index: -1 の時は box の中央　// 使いまわせる？
      _x,
      _y,
      field.connectStartObjId, // 使いまわせる？
      field.connectStartCharIndex, // 使いまわせる？
      null,
      null,
      field.drawingLine.id
    );
    field.drawingLine = line;
    // remote
    updateLine(line);

    field.redraw('connect');
    return;
  }

  const line = new Line(
    targetObj.nthCenterX(field.connectStartCharIndex), // index: -1 の時は box の中央
    targetObj.nthCenterY(field.connectStartCharIndex), // index: -1 の時は box の中央
    _x,
    _y,
    field.connectStartObjId,
    field.connectStartCharIndex,
    null,
    null
  );

  field.drawingLine = line;
  // remote
  insertLine(line);

  field.redraw('connect');
}
