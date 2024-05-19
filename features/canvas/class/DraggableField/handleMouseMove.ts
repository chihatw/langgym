import { MODE, REDRAW } from '../../constants';
import { insertLine, updateLine } from '../../services/client';
import { Line } from '../Line';
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
    case MODE.connect:
      handleMouseMove_connect(field, _x, _y);
      return;
    default:
  }
}

function handleMouseMove_new(field: DraggableField, _x: number, _y: number) {
  // ドラッグオブジェクトがある場合
  if (field.dragObj) {
    field.dragObj.dragging(_x - field.dragDX, _y - field.dragDY);

    field.redraw(REDRAW.dragging);
    return;
  }

  // ドラッグオブジェクトがない場合 これは不要？
  // todo connect / expand
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

    field.redraw(REDRAW.connect);
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

  field.redraw(REDRAW.connect);
}
