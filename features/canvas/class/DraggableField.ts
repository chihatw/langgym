import { MODE } from '../constants';
import { Box } from './Box';
import { Field } from './Field';

export class DraggableField extends Field {
  mode: string = MODE.drag;
  selectObj: Box | null = null;

  #dragObj: Box | null = null;
  #dragDX: number = 0;
  #dragDY: number = 0;

  #splitBy = 0;
  #highlights: { [boxId: number]: number[] } = {};

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

  select(obj: Box) {
    this.selectObj = obj;
    this.selectObj.select();
    this.#handleSetSelectedObj(this.selectObj);
  }

  deselect() {
    if (!this.selectObj) return;
    this.selectObj.deselect();
    this.selectObj = null;
    this.#handleSetSelectedObj(null);
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

        let highlights: { [boxId: number]: number[] } = {};
        for (const obj of this.objs) {
          highlights[obj.id] = obj.highlighting(_x, _y);
        }

        if (JSON.stringify(this.#highlights) !== JSON.stringify(highlights)) {
          this.#highlights = highlights;
          _this.redraw('highlight');
        }
        return;

      case MODE.split:
        let splitBy = 0;
        for (const obj of this.objs) {
          const _splitBY = obj.splitting(_x, _y);
          if (_splitBY) splitBy = _splitBY;
        }

        if (this.#splitBy !== splitBy) {
          this.#splitBy = splitBy;
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
        // 下にオブジェクトがなければ終了
        if (!obj) return;

        // 選ばれたオブジェクトのハイライトをリセット
        this.#highlights[obj.id] = [];
        obj.dehighlight();

        _this.grab(obj, _x - obj.x, _y - obj.y);
        if (!_this.#dragObj) throw new Error();
        _this.#dragObj.dragging(_x - _this.#dragDX, _y - _this.#dragDY);
        _this.redraw('grab');
        return;
      case MODE.select:
        // 下にオブジェクトがない、かつ選択オブジェクトもない場合、終了
        if (!obj && !_this.selectObj) return;

        // 選択オブジェクトがあれば deselect()
        if (_this.selectObj) _this.deselect();

        // 下にオブジェクトがある、かつ選択オブジェクトと違う場合 select()
        if (!!obj && (!_this.selectObj || _this.selectObj.id !== obj.id)) {
          _this.select(obj);
        }
        _this.redraw('select');
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
