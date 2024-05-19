import { MODE } from '../../constants';
import { deleteBox } from '../../services/client';
import { Box } from '../Box';
import { Field } from '../Field';
import { handleMouseDown } from './handleMouseDown';
import { handleMouseMove } from './handleMouseMove';
import { handleMouseUp } from './handleMouseUp';

export class DraggableField extends Field {
  mode: string = MODE.new;
  selectObj: Box | null = null;

  dragObj: Box | null = null;
  dragDX: number = 0;
  dragDY: number = 0;

  splitBy = 0;
  highlights: { [boxId: number]: number[] } = {};

  connectStartObjId = 0;
  connectStartCharIndex = -1;

  expandObj: Box | null = null;

  handleSetSelectedObj;
  focusInput;

  constructor(
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    handleSetSelectedObj: (obj: Box | null) => void,
    focusInput: () => void
  ) {
    super(width, height, canvas);
    this.handleSetSelectedObj = handleSetSelectedObj;
    this.focusInput = focusInput;

    canvas.addEventListener('mousedown', (e) => handleMouseDown(e, this));
    canvas.addEventListener('mouseup', (e) => handleMouseUp(e, this));
    canvas.addEventListener('mousemove', (e) => handleMouseMove(e, this));
  }

  _findBoxInBounds(x: number, y: number) {
    for (let obj of this.objs) {
      if (obj.inBounds(x, y)) return obj;
    }
  }

  select(obj: Box) {
    this.selectObj = obj;
    this.handleSetSelectedObj(this.selectObj);
  }

  deselect() {
    if (!this.selectObj) return;
    this.selectObj = null;
    this.handleSetSelectedObj(null);
  }

  grab(obj: Box, dragDX: number, dragDY: number) {
    this.dragDX = dragDX;
    this.dragDY = dragDY;

    this.dragObj = obj;
  }

  ungrab() {
    this.dragObj = null;
  }

  delete(obj: Box) {
    this.selectObj = null;
    this.objs = this.objs.filter((o) => o.id !== obj.id);
    this.connectedObjSets = this.connectedObjSets.filter(
      (s) => !s.includes(obj.id)
    );

    // remote
    deleteBox(obj.id);

    this.redraw('delete box');
  }

  updateLabel(label: string) {
    if (!this.selectObj) throw new Error();
    this.selectObj.updateLabel(label);

    // ハイライトは解除
    this.selectObj.dehighlight();

    const clone = { ...this.highlights };
    delete clone[this.selectObj.id];
    this.highlights = clone;

    this.redraw('update label');
  }

  updateMode(mode: string) {
    this.deselect();
    this.mode = mode;
    this.redraw('update mode');
  }
}
