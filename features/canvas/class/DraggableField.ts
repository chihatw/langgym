import { FONT_HEIGHT, MODE } from '../constants';
import { Box } from './Box';
import { Field } from './Field';
import { Line } from './Line';

export class DraggableField extends Field {
  mode: string = MODE.drag;
  selectObj: Box | null = null;

  dragObj: Box | null = null;
  dragDX: number = 0;
  dragDY: number = 0;

  splitBy = 0;
  highlights: { [boxId: number]: number[] } = {};

  #handleSetSelectedObj;

  connectStartObjId = 0;
  connectStartCharIndex = -1;

  expandObj: Box | null = null;

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
    this.dragDX = dragDX;
    this.dragDY = dragDY;

    if (this.dragObj) this.dragObj.ungrab();
    this.dragObj = obj;
    this.dragObj.grab();
  }

  ungrab() {
    if (this.dragObj) this.dragObj.ungrab();
    this.dragObj = null;
  }

  delete(obj: Box) {
    this.selectObj = null;
    this.objs = this.objs.filter((o) => o.id !== obj.id);
    this.connectedLines = this.connectedLines.filter(
      (l) => l.startObjId !== obj.id && l.endObjId !== obj.id
    );
    this.redraw('delete box');
  }

  updateLabel(label: string) {
    if (!this.selectObj) throw new Error();
    this.selectObj.updateLabel(label);
    this.connectedLines = this.connectedLines.filter(
      (l) => ![l.startObjId, l.endObjId!].includes(this.selectObj!.id)
    );
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
      case MODE.expand:
        handleMouseMove_drag(_this, _x, _y);
        return;
      case MODE.split:
        handleMouseMove_split(_this, _x, _y);
        return;
      case MODE.highlight:
        handleMouseMove_highlight(_this, _x, _y);
        return;
      case MODE.connect:
        handleMouseMove_connect(_this, _x, _y);
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
        handleMouseDown_drag(_this, obj, _x, _y, e);
        return;
      case MODE.highlight:
        handleMouseDown_highlight(_this, obj);
        return;
      case MODE.select:
        handleMouseDown_select(_this, obj);
        return;
      case MODE.split:
        handleMouseDown_split(_this, obj);
        return;
      case MODE.connect:
        handleMouseDown_connect(_this, obj, _x, _y);
        return;
      case MODE.expand:
        // 下にオブジェクトがなければ、終了
        if (!obj) return;

        // 下に char がなければ、終了
        const index = obj.indexOf(_x, _y);
        if (index < 0) return;

        // のっていれば、新しいboxを作成
        const box = new Box(
          obj.x - FONT_HEIGHT / 2,
          obj.y - FONT_HEIGHT / 2,
          '',
          0
        );
        _this.objs = [..._this.objs, box];
        _this.grab(box, _x - box.x, _y - box.y);

        // 新しいboxとcharをconnected line で結ぶ
        // 新しいbox は char を持っていないので、 index: -1 , box の中心から線を延ばす
        const line = new Line(
          box.nthCenterX(-1),
          box.nthCenterY(-1),
          obj.nthCenterX(index),
          obj.nthCenterY(index),
          box.id,
          -1,
          obj.id,
          index
        );

        // connectedLines を追加
        _this.connectedLines = [..._this.connectedLines, line];
        console.log(_this.connectedLines);
        _this.redraw('expand');
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
      case MODE.expand:
        handleMouseUp_drag(_this);
        return;
      case MODE.connect:
        handleMouseUp_connect(_this, obj, _x, _y);
        return;

      default:
    }
  }
}

function handleMouseMove_drag(_this: DraggableField, _x: number, _y: number) {
  if (!_this.dragObj) return;

  _this.dragObj.dragging(_x - _this.dragDX, _y - _this.dragDY);

  // recalc connectedLines
  _this.connectedLines = _this.connectedLines.map((l) => {
    const startObj = _this.objs.find((o) => o.id === l.startObjId);
    if (!startObj) throw new Error('no start obj');
    const endObj = _this.objs.find((o) => o.id === l.endObjId);
    if (!endObj) throw new Error('no end obj');
    if (typeof l.endCharIndex !== 'number') throw new Error('no endCharIndex');
    return new Line(
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
  });

  _this.redraw('dragging');
}

function handleMouseMove_split(_this: DraggableField, _x: number, _y: number) {
  let splitBy = 0;
  for (const obj of _this.objs) {
    const _splitBY = obj.splitting(_x, _y);
    if (_splitBY) splitBy = _splitBY;
  }

  if (_this.splitBy !== splitBy) {
    _this.splitBy = splitBy;
    _this.redraw('split');
  }
}

function handleMouseMove_highlight(
  _this: DraggableField,
  _x: number,
  _y: number
) {
  let highlights: { [boxId: number]: number[] } = {};
  for (const obj of _this.objs) {
    highlights[obj.id] = obj.highlighting(_x, _y);
  }

  if (JSON.stringify(_this.highlights) !== JSON.stringify(highlights)) {
    _this.highlights = highlights;
    _this.redraw('highlight');
  }
}

function handleMouseMove_connect(
  _this: DraggableField,
  _x: number,
  _y: number
) {
  // start obj id がない場合は終了
  if (!_this.connectStartObjId) return;

  const targetObj = _this.objs.find((o) => o.id === _this.connectStartObjId);
  if (!targetObj) throw new Error();

  const line = new Line(
    targetObj.nthCenterX(_this.connectStartCharIndex), // index: -1 の時は box の中央
    targetObj.nthCenterY(_this.connectStartCharIndex), // index: -1 の時は box の中央
    _x,
    _y,
    _this.connectStartObjId,
    _this.connectStartCharIndex
  );
  _this.drawingLine = line;
  _this.redraw('connect');
}

function handleMouseDown_drag(
  _this: DraggableField,
  obj: Box | undefined,
  _x: number,
  _y: number,
  e: MouseEvent
) {
  // 下にオブジェクトがない場合
  if (!obj) {
    // 選択がなければ、そのまま終了
    if (!_this.selectObj) return;

    // 選択があれば、deselect()
    _this.deselect();
    _this.redraw('grab');
    return;
  }

  _this.grab(obj, _x - obj.x, _y - obj.y);
  if (!_this.dragObj) throw new Error();
  _this.dragObj.dragging(_x - _this.dragDX, _y - _this.dragDY);
  _this.redraw('grab');
  return;
}

function handleMouseDown_highlight(
  _this: DraggableField,
  obj: Box | undefined
) {
  // 下にオブジェクトがなければ終了
  if (!obj) return;

  // 選ばれたオブジェクトのハイライトをリセット
  _this.highlights[obj.id] = [];
  obj.dehighlight();
  _this.redraw('grab');
}

function handleMouseDown_select(_this: DraggableField, obj: Box | undefined) {
  // 下にオブジェクトがない、かつ選択オブジェクトもない場合、終了
  if (!obj && !_this.selectObj) return;

  // 選択オブジェクトがあれば deselect()
  if (_this.selectObj) _this.deselect();

  // 下にオブジェクトがある、かつ選択オブジェクトと違う場合 select()
  if (!!obj && (!_this.selectObj || _this.selectObj.id !== obj.id)) {
    _this.select(obj);
  }
  _this.redraw('select');
}

function handleMouseDown_split(_this: DraggableField, obj: Box | undefined) {
  // splitBy が 0 または下にオブジェクトがなければ終了
  if (!_this.splitBy || !obj) return;

  // obj.divide();
  const charSets = [
    obj.label.substring(0, _this.splitBy),
    obj.label.substring(_this.splitBy),
  ];

  // box を新しく２つ作成
  const box1 = new Box(obj.x - 64, obj.y, charSets[0], 0);
  const box2 = new Box(obj.splittedX, obj.y, charSets[1], 0);
  _this.objs = [..._this.objs.filter((o) => o.id !== obj.id), box2, box1];

  // connected line の更新
  _this.connectedLines = _this.connectedLines.map((l) => {
    // 関係があった場合は、objId, charIndex を更新
    if (l.startObjId === obj.id) {
      const newStartObj = l.startCharIndex < _this.splitBy ? box1 : box2;
      const newStartCharIndex =
        l.startCharIndex < _this.splitBy
          ? l.startCharIndex
          : l.startCharIndex - _this.splitBy;
      return new Line(
        newStartObj.nthCenterX(newStartCharIndex),
        newStartObj.nthCenterY(newStartCharIndex),
        l.endX,
        l.endY,
        newStartObj.id,
        newStartCharIndex,
        l.endObjId,
        l.endCharIndex,
        l.id
      );
    }

    // 関係があった場合は、objId, charIndex を更新
    if (l.endObjId === obj.id) {
      const newEndObj = l.endCharIndex! < _this.splitBy ? box1 : box2;
      const newEndCharIndex =
        l.endCharIndex! < _this.splitBy
          ? l.endCharIndex!
          : l.endCharIndex! - _this.splitBy;
      return new Line(
        l.startX,
        l.startY,
        newEndObj.nthCenterX(newEndCharIndex),
        newEndObj.nthCenterY(newEndCharIndex),
        l.startObjId,
        l.startCharIndex,
        newEndObj.id,
        newEndCharIndex,
        l.id
      );
    }

    return l;
  });

  // 関連 highlights の削除
  const clone = { ..._this.highlights };
  delete clone[obj.id];
  _this.highlights = clone;

  // splitBy のリセット
  _this.splitBy = 0;

  _this.redraw('divide');
  return;
}

function handleMouseDown_connect(
  _this: DraggableField,
  obj: Box | undefined,
  _x: number,
  _y: number
) {
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

  _this.connectStartObjId = obj.id;
  _this.connectStartCharIndex = index;
}

function handleMouseUp_drag(_this: DraggableField) {
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

  // オブジェクトがない、またはstartと同じ場合、　charIndex がない場合は、drawing line を消して終了
  if (
    !obj ||
    obj.id === _this.connectStartObjId ||
    obj.indexOf(_x, _y) === -1
  ) {
    _this.connectStartObjId = 0;
    _this.connectStartCharIndex = -1;
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
  _this.connectedLines = [..._this.connectedLines, line];

  // drawing line は削除する
  _this.connectStartObjId = 0;
  _this.connectStartCharIndex = -1;
  _this.drawingLine = null;
  _this.redraw('remove drawing line');
}
