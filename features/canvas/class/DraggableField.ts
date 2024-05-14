import { Box } from './Box';
import { Field } from './Field';

export class DraggableField extends Field {
  selectObj: Box | null = null;

  #dragObj: Box | null = null;
  #dragDX: number = 0;
  #dragDY: number = 0;

  isSplitted = false;
  #handleSetLabel;

  constructor(
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    handleSetLabel: (label: string) => void
  ) {
    super(width, height, canvas);
    this.#handleSetLabel = handleSetLabel;
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
    if (this.selectObj) {
      // 既存の selectObj は一旦解除
      this.selectObj.deselect();
      // 選択済みのオブジェクトを再選択した場合、選択を解除して終了
      if (this.selectObj.id === obj.id) {
        this.selectObj = null;
        this.#handleSetLabel('');
        return;
      }
    }

    // それ以外の場合
    this.selectObj = obj;
    this.selectObj.select();
    this.#handleSetLabel(this.selectObj.label);
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

  updateLabel(label: string) {
    if (!this.selectObj) throw new Error();
    this.selectObj.updateLabel(label);
    this.redraw('update label');
  }

  handleMouseMove(e: MouseEvent, _this: DraggableField) {
    // selectedObj があれば、マウスムーブは無視
    if (this.selectObj) return;

    const dpr = window.devicePixelRatio || 1;
    const { offsetX: x, offsetY: y } = e;
    const _x = x / dpr;
    const _y = y / dpr;

    if (_this.#dragObj) {
      _this.#dragObj.dragging(_x - _this.#dragDX, _y - _this.#dragDY);
      _this.redraw('dragging');
      return;
    }

    const char = _this._findCharInBoundx(_x, _y);
    if (this.isSplitted !== !!char) {
      this.isSplitted = !!char;
      _this.redraw('split');
    }
  }

  handleMouseDown(e: MouseEvent, _this: DraggableField) {
    // isSplitted の場合は、マウスダウンは無視
    if (this.isSplitted) return;

    const dpr = window.devicePixelRatio || 1;
    const { offsetX: x, offsetY: y } = e;
    const _x = x / dpr;
    const _y = y / dpr;
    const obj = _this._findBoxInBounds(_x, _y); // ポインターの下にあるオブジェクトを抽出

    // 右クリックの場合は、select
    const isRightClick = e.button === 2;
    if (isRightClick) {
      if (obj) {
        _this.select(obj);
        _this.redraw('select');
        return;
      }
    }

    // それ以外の場合、grab
    if (obj) {
      _this.grab(obj, _x - obj.x, _y - obj.y);
      if (!_this.#dragObj) throw new Error();
      _this.#dragObj.dragging(_x - _this.#dragDX, _y - _this.#dragDY);
      _this.redraw('grab');
      return;
    }

    // if (_this.#dragObj) {
    //   _this.ungrab();
    //   _this.#dragObj = null;
    //   _this.redraw('ungrab mouse down');
    // }
  }

  handleMouseUp(e: MouseEvent, _this: DraggableField) {
    if (_this.#dragObj) {
      _this.ungrab();
      _this.#dragObj = null;
      _this.redraw('ungrab ');
    }
  }
}
