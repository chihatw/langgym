import { Box } from './Box';
import { Char } from './Char';
import { Field } from './Field';

// Field を継承
export class DraggableField extends Field {
  #selectedObj: Box | null = null;
  #selectedChar: Char | null = null;
  #dragObj: Box | null = null;
  #dragDX: number = 0;
  #dragDY: number = 0;
  #handleSplitBy: ((index: number) => void) | undefined;

  setHandleSplitBy(fn: (index: number) => void) {
    this.#handleSplitBy = fn;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    super.setCanvas(canvas);

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
      const i = obj.splitBy(x, y);
      return obj.chars[i - 1];
    }
  }

  select(obj: Box) {
    if (this.#selectedObj) this.#selectedObj.deselect();
    this.#selectedObj = obj;
    this.#selectedObj.select();
  }

  selectChar(char: Char) {
    this.#selectedChar = char;
  }

  deselect() {
    if (this.#selectedObj) this.#selectedObj.deselect();
    this.#selectedObj = null;
  }

  deselectChar() {
    this.#selectedChar = null;
  }

  handleMouseDown(e: MouseEvent, _this: DraggableField) {
    const { offsetX: x, offsetY: y } = e;
    const _x = x / _this.dpr;
    const _y = y / _this.dpr;

    // selectedChar がある状態では、ドラッグ処理はしない
    if (this.#selectedChar) return;

    const obj = _this._findBoxInBounds(_x, _y); // ポインターの下にあるオブジェクトを抽出
    if (obj) {
      _this.select(obj);
      _this.#dragObj = obj;
      _this.#dragDX = _x - obj.x;
      _this.#dragDY = _y - obj.y;

      _this.#dragObj.dragging(_x - _this.#dragDX, _y - _this.#dragDY);
    } else {
      _this.deselect();
      _this.#dragObj = null;
    }
    _this.redraw();
  }

  handleMouseUp(e: MouseEvent, _this: DraggableField) {
    _this.deselect();
    _this.#dragObj = null;
    _this.redraw();
  }

  handleMouseMove(e: MouseEvent, _this: DraggableField) {
    const { offsetX: x, offsetY: y } = e;
    const _x = x / _this.dpr;
    const _y = y / _this.dpr;

    if (_this.#dragObj) {
      _this.#dragObj.dragging(_x - _this.#dragDX, _y - _this.#dragDY);
    }

    const char = _this._findCharInBoundx(_x, _y);
    if (char) {
      _this.selectChar(char);
    } else {
      _this.deselectChar();
    }
    _this.redraw();
  }
}
