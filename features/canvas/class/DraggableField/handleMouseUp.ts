import { MODE } from '../../constants';
import { deleteLine, insertLine } from '../../services/client';
import { Box } from '../Box';
import { Line } from '../Line';
import { DraggableField } from './DraggableField';

export function handleMouseUp(e: MouseEvent, _this: DraggableField) {
  const dpr = window.devicePixelRatio || 1;
  const { offsetX: x, offsetY: y } = e;
  const _x = x / dpr;
  const _y = y / dpr;

  const obj = _this._findBoxInBounds(_x, _y); // ポインターの下にあるオブジェクトを抽出
  switch (_this.mode) {
    case MODE.new:
      handleMouseUp_new(_this);
      return;
    case MODE.connect:
      handleMouseUp_connect(_this, obj, _x, _y);
      return;

    default:
  }
}

function handleMouseUp_new(_this: DraggableField) {
  if (!_this.dragObj) return;

  // ドラッグしていたら、解除する
  _this.ungrab();
  _this.dragObj = null;
  _this.redraw('ungrab');
}

function handleMouseUp_connect(
  _this: DraggableField,
  obj: Box | undefined,
  _x: number,
  _y: number
) {
  // start obj id か start char index がなければ終了
  if (!_this.connectStartObjId || _this.connectStartCharIndex === -1) return;

  // オブジェクトがない、またはstartと同じ場合、　charIndex がない場合、終了
  if (
    !obj ||
    obj.id === _this.connectStartObjId ||
    obj.indexOf(_x, _y) === -1
  ) {
    _this.connectStartObjId = 0;
    _this.connectStartCharIndex = -1;

    // remote
    if (_this.drawingLine) deleteLine(_this.drawingLine.id);

    // canvas
    _this.drawingLine = null;
    _this.redraw('remove drawing line');
    return;
  }

  const index = obj.indexOf(_x, _y);

  const startObj = _this.objs.find((o) => o.id === _this.connectStartObjId);
  if (!startObj) throw new Error();

  const line = new Line(
    startObj.nthCenterX(_this.connectStartCharIndex),
    startObj.nthCenterY(_this.connectStartCharIndex),
    obj.nthCenterX(index),
    obj.nthCenterY(index),
    _this.connectStartObjId,
    _this.connectStartCharIndex,
    obj.id,
    index
  );

  // connectedLines を追加して
  // canvas
  // todo  handleMouseUp_new で expand していて、他のオブジェクトの上で mouse up したら、 非表示の expand のオブジェクトを削除して、 connectedObjSets に追加する
  // _this.connectedLines = [..._this.connectedLines, line];
  // remote
  insertLine(line);

  // drawing line は削除する
  _this.connectStartObjId = 0;
  _this.connectStartCharIndex = -1;

  // remote
  if (_this.drawingLine) deleteLine(_this.drawingLine.id);

  // canvas
  _this.drawingLine = null;
  _this.redraw('remove drawing line');
}
