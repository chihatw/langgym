import { MODE } from '../constants';
import { Box } from './Box';
import { Field } from './Field';
import { Line } from './Line';

export class DraggableField extends Field {
  mode: string = MODE.drag;
  selectObj: Box | null = null;

  #dragObj: Box | null = null;
  #dragDX: number = 0;
  #dragDY: number = 0;

  #splitBy = 0;
  #highlights: { [boxId: number]: number[] } = {};

  #handleSetSelectedObj;

  #connectStartObjId = 0;
  #connectStartCharIndex = -1;

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
        if (!_this.#dragObj) return;

        _this.#dragObj.dragging(_x - _this.#dragDX, _y - _this.#dragDY);
        _this.redraw('dragging');
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
      case MODE.highlight:
        let highlights: { [boxId: number]: number[] } = {};
        for (const obj of this.objs) {
          highlights[obj.id] = obj.highlighting(_x, _y);
        }

        if (JSON.stringify(this.#highlights) !== JSON.stringify(highlights)) {
          this.#highlights = highlights;
          _this.redraw('highlight');
        }
        return;
      case MODE.connect:
        // start obj id , start char index がない場合は終了
        if (!this.#connectStartObjId && this.#connectStartCharIndex === -1)
          return;

        const targetObj = this.objs.find(
          (o) => o.id === this.#connectStartObjId
        );
        if (!targetObj) throw new Error();
        const targetChar = targetObj.chars.at(this.#connectStartCharIndex);
        if (!targetChar) throw new Error();

        const line = new Line(
          targetChar.x + targetChar.width / 2,
          targetChar.y + targetChar.height / 2,
          _x,
          _y,
          this.#connectStartObjId,
          this.#connectStartCharIndex
        );
        _this.drawingLine = line;
        _this.redraw('connect');
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
        // 下にオブジェクトがない場合
        if (!obj) {
          // 選択がなければ、そのまま終了
          if (!_this.selectObj) return;

          // 選択があれば、deselect()
          _this.deselect();
          _this.redraw('grab');
          return;
        }

        // 右クリックでなければ、grab()
        if (e.button !== 2) {
          _this.grab(obj, _x - obj.x, _y - obj.y);
          if (!_this.#dragObj) throw new Error();
          _this.#dragObj.dragging(_x - _this.#dragDX, _y - _this.#dragDY);
          _this.redraw('grab');
          return;
        }

        // 右クリックなら select()
        // 下にオブジェクトがない、かつ選択オブジェクトもない場合、終了
        if (!obj && !_this.selectObj) return;

        // 下にオブジェクトがある、かつ選択オブジェクトと違う場合 select()
        if (!!obj && (!_this.selectObj || _this.selectObj.id !== obj.id)) {
          _this.select(obj);
        }
        _this.redraw('select');
        return;
      case MODE.highlight:
        // 下にオブジェクトがなければ終了
        if (!obj) return;

        // 選ばれたオブジェクトのハイライトをリセット
        this.#highlights[obj.id] = [];
        obj.dehighlight();
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
        // splitBy が 0 または下にオブジェクトがなければ終了
        if (!this.#splitBy || !obj) return;

        // obj.divide();
        const charSets = [
          obj.label.substring(0, this.#splitBy),
          obj.label.substring(this.#splitBy),
        ];

        // box を新しく２つ作成
        const box1 = new Box(obj.x - 64, obj.y, charSets[0], 0);
        const box2 = new Box(obj.splittedX, obj.y, charSets[1], 0);
        _this.objs = [..._this.objs.filter((o) => o.id !== obj.id), box2, box1];

        // 関連 highlights の削除
        const clone = { ..._this.#highlights };
        delete clone[obj.id];
        _this.#highlights = clone;

        // splitBy のリセット
        _this.#splitBy = 0;

        // mode を drag にしたいが、 React Component へ伝えられないまま
        _this.mode = MODE.drag;
        _this.redraw('divide');
        return;
      case MODE.connect:
        // 下にオブジェクトがなければ、終了
        if (!obj) return;

        // 下に char がなければ、終了
        const index = obj.indexOf(_x, _y);
        if (index < 0) return;

        // connectedLines に 含まれていれば、削除する
        _this.connectedLines = _this.connectedLines.filter((l) => {
          if (l.startObjId === obj.id || l.endObjId === obj.id) return false;
          return true;
        });

        _this.#connectStartObjId = obj.id;
        _this.#connectStartCharIndex = index;
        return;
      default:
    }
  }

  handleMouseUp(e: MouseEvent, _this: DraggableField) {
    const dpr = window.devicePixelRatio || 1;
    const { offsetX: x, offsetY: y } = e;
    const _x = x / dpr;
    const _y = y / dpr;

    const obj = _this._findBoxInBounds(_x, _y); // ポインターの下にあるオブジェクトを抽出
    switch (_this.mode) {
      case MODE.drag:
        if (!_this.#dragObj) return;

        // ドラッグしていたら、解除する
        _this.ungrab();
        _this.#dragObj = null;
        _this.redraw('ungrab');
        return;
      case MODE.connect:
        // start obj id か start char index がなければ終了
        if (!_this.#connectStartObjId || _this.#connectStartCharIndex === -1)
          return;

        // オブジェクトがない、またはstartと同じ場合、　charIndex がない場合は、drawing line を消して終了
        if (
          !obj ||
          obj.id === _this.#connectStartObjId ||
          obj.indexOf(_x, _y) === -1
        ) {
          _this.#connectStartObjId = 0;
          _this.#connectStartCharIndex = -1;
          _this.drawingLine = null;
          _this.redraw('remove drawing line');
          return;
        }

        const index = obj.indexOf(_x, _y);

        const startObj = _this.objs.find(
          (o) => o.id === _this.#connectStartObjId
        );
        if (!startObj) throw new Error();

        const startChar = startObj.chars.at(_this.#connectStartCharIndex);
        if (!startChar) throw new Error();

        const endChar = obj.chars.at(index);
        if (!endChar) throw new Error();

        const line = new Line(
          startChar.x + startChar.width / 2,
          startChar.y + startChar.height / 2,
          endChar.x + endChar.width / 2,
          endChar.y + endChar.height / 2,
          _this.#connectStartObjId,
          _this.#connectStartCharIndex,
          obj.id,
          index
        );

        // connectedLines を追加して
        _this.connectedLines = [..._this.connectedLines, line];

        // drawing line は削除する
        _this.#connectStartObjId = 0;
        _this.#connectStartCharIndex = -1;
        _this.drawingLine = null;
        _this.redraw('remove drawing line');
        return;

      default:
    }
  }
}
