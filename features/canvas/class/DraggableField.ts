import { MODE } from '../constants';
import { Box } from './Box';
import { Field } from './Field';

export class DraggableField extends Field {
  mode: string = MODE.drag;
  selectObj: Box | null = null;

  #dragObj: Box | null = null;
  #dragDX: number = 0;
  #dragDY: number = 0;

  #isSplitted = false;

  #handleSetSelectedObj;

  constructor(
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    handleSetSelectedObj: (obj: Box | null) => void
  ) {
    super(width, height, canvas);
    this.#handleSetSelectedObj = handleSetSelectedObj;
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e, this));
    canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e, this));
    canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e, this));
  }

  _findBoxInBounds(x: number, y: number) {
    for (let obj of this.objs) {
      if (obj.inBounds(x, y)) return obj;
    }
  }

  _findCharInBoundx(x: number, y: number) {
    for (let obj of this.objs) {
      const char = obj.charInBounds(x, y);
      if (char) {
        return char;
      }
    }
    return;
  }

  select(obj: Box) {
    const selectSameObject = this.selectObj?.id === obj.id;

    // 既存の selectObj は一旦解除
    this.deselect();
    // 選択済みのオブジェクトを再選択した場合、ここで終了
    if (selectSameObject) return;

    // それ以外の場合
    this.selectObj = obj;
    this.selectObj.select();
    this.#handleSetSelectedObj(this.selectObj);
  }

  deselect() {
    if (this.selectObj) {
      this.selectObj.deselect();
      this.selectObj = null;
      this.#handleSetSelectedObj(null);
    }
  }

  grab(obj: Box, dragDX: number, dragDY: number) {
    this.#dragDX = dragDX;
    this.#dragDY = dragDY;

    if (this.#dragObj) this.#dragObj.ungrab();
    this.#dragObj = obj;
    this.#dragObj.grab();
  }

  ungrab() {
    if (this.#dragObj) this.#dragObj.ungrab();
    this.#dragObj = null;
  }

  delete(obj: Box) {
    this.selectObj = null;
    this.objs = this.objs.filter((o) => o.id !== obj.id);
    this.redraw('delete box');
  }

  updateLabel(label: string) {
    if (!this.selectObj) throw new Error();
    this.selectObj.updateLabel(label);
    this.redraw('update label');
  }

  updateMode(mode: string) {
    this.deselect();
    this.mode = mode;
    this.redraw('update mode');
  }

  handleMouseMove(e: MouseEvent, _this: DraggableField) {
    const dpr = window.devicePixelRatio || 1;
    const { offsetX: x, offsetY: y } = e;
    const _x = x / dpr;
    const _y = y / dpr;

    switch (this.mode) {
      case MODE.drag:
        if (_this.#dragObj) {
          _this.#dragObj.dragging(_x - _this.#dragDX, _y - _this.#dragDY);
          _this.redraw('dragging');
          return;
        }
        return;
      case MODE.split:
        const char = _this._findCharInBoundx(_x, _y);
        if (this.#isSplitted !== !!char) {
          this.#isSplitted = !!char;
          _this.redraw('split');
        }
        return;
      case MODE.select:
      default:
    }
  }

  handleMouseDown(e: MouseEvent, _this: DraggableField) {
    const dpr = window.devicePixelRatio || 1;
    const { offsetX: x, offsetY: y } = e;
    const _x = x / dpr;
    const _y = y / dpr;

    const obj = _this._findBoxInBounds(_x, _y); // ポインターの下にあるオブジェクトを抽出

    switch (this.mode) {
      case MODE.drag:
        if (obj) {
          _this.grab(obj, _x - obj.x, _y - obj.y);
          if (!_this.#dragObj) throw new Error();
          _this.#dragObj.dragging(_x - _this.#dragDX, _y - _this.#dragDY);
          _this.redraw('grab');
          return;
        }
        return;
      case MODE.select:
        if (!obj) {
          if (_this.selectObj) {
            _this.selectObj.deselect();
            _this.selectObj = null;
            _this.#handleSetSelectedObj(null);
            _this.redraw('deselect');
            return;
          }
        } else {
          _this.select(obj);
          _this.redraw('select');
          return;
        }
        return;
      case MODE.split:
        // todo split
        return;
      default:
    }
  }

  handleMouseUp(e: MouseEvent, _this: DraggableField) {
    if (_this.#dragObj) {
      _this.ungrab();
      _this.#dragObj = null;
      _this.redraw('ungrab ');
    }
  }
}
