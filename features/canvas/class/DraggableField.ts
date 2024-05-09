import { Box } from './Box';
import { Field } from './Field';

export class DraggableField extends Field {
  #selectedObj: Box | null = null;
  #dragObj: Box | null = null;
  #dragDX: number = 0;
  #dragDY: number = 0;

  setCanvas(canvas: HTMLCanvasElement) {
    super.setCanvas(canvas);

    canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e, this));
    canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e, this));
    canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e, this));
  }

  _findObjInBounds(x: number, y: number) {
    for (let obj of this.objs) {
      if (obj.inBounds(x, y)) return obj;
    }
  }

  select(obj: Box) {
    if (this.#selectedObj) this.#selectedObj.deselect();
    this.#selectedObj = obj;
    this.#selectedObj.select();
  }

  deselect() {
    if (this.#selectedObj) this.#selectedObj.deselect();
    this.#selectedObj = null;
  }

  handleMouseDown(e: MouseEvent, _this: DraggableField) {
    const { offsetX: x, offsetY: y } = e;
    const _x = x / _this.dpr;
    const _y = y / _this.dpr;

    const obj = _this._findObjInBounds(_x, _y); // ポインターの下にあるオブジェクトを抽出
    if (obj) {
      _this.select(obj);
      _this.#dragObj = obj;
      _this.#dragDX = _x - obj.pos.x;
      _this.#dragDY = _y - obj.pos.y;

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
      _this.redraw();
    }
  }
}
