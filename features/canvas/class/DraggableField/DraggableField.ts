import {
  BOX_HEIGHT,
  BOX_MIN_WIDTH,
  CANVAS_FIELD_ID,
  MODE,
  REDRAW,
} from '../../constants';
import {
  deleteBox,
  insertBox,
  updateBox,
  updateField,
} from '../../services/client';
import { boxCollision } from '../../services/utils';
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

  focusInput;
  handleSetSelectedObj;

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
    // 選択オブジェクトを再度選択すれば、選択解除
    if (this.selectObj && obj.id === this.selectObj.id) {
      this.selectObj = null;
      this.handleSetSelectedObj(null);
      return;
    }

    this.selectObj = obj;
    this.handleSetSelectedObj(this.selectObj);
    setTimeout(() => this.focusInput(), 200);
    this.redraw(REDRAW.select);
  }

  add(_x: number, _y: number) {
    const box = new Box(_x, _y, '', 0, [], false);

    // canvas
    this.objs = [...this.objs, box];

    this.selectObj = box;
    this.handleSetSelectedObj(this.selectObj);
    setTimeout(() => this.focusInput(), 200);

    this.redraw(REDRAW.add);

    // remote
    insertBox(box);
  }

  delete(objId: number) {
    this.selectObj = null;
    this.objs = this.objs.filter((o) => o.id !== objId);
    this.connectedObjSets = this.connectedObjSets.filter(
      (s) => !s.includes(objId)
    );

    this.redraw(REDRAW.delete);

    // remote
    deleteBox(objId);
  }

  updateLabel(label: string) {
    if (!this.selectObj) throw new Error();
    this.selectObj.updateLabel(label);

    // ハイライトは解除
    this.selectObj.dehighlight();

    const clone = { ...this.highlights };
    delete clone[this.selectObj.id];
    this.highlights = clone;

    this.redraw(REDRAW.updateLabel);

    // remote
    updateBox(this.selectObj);
  }

  grab(obj: Box, _x: number, _y: number) {
    if (this.selectObj) {
      this.selectObj = null;
      this.handleSetSelectedObj(null);
    }

    this.dragDX = _x - obj.x;
    this.dragDY = _y - obj.y;
    this.dragObj = obj;

    this.dragObj.dragging(obj.x, obj.y);
    this.redraw(REDRAW.grab);

    // remote
    updateBox(this.dragObj);
  }

  drag(_x: number, _y: number) {
    // ドラッグオブジェクトがなければ、終了
    if (!this.dragObj) return;
    // expandObj, expandStart がある場合、 expand に hidden をつけるかどうか判断
    if (this.expandObj) this.dragObj.isHidden = _isHidden(this);

    this.dragObj.dragging(_x - this.dragDX, _y - this.dragDY);
    this.redraw(REDRAW.dragging);

    // remote
    updateBox(this.dragObj);
  }

  ungrab() {
    if (this.expandObjId) this.expandObjId = null;
    if (this.expandStartObjId) this.expandStartObjId = null;
    this.dragObj = null;
    this.redraw(REDRAW.ungrab);
  }

  split(obj: Box, _x: number, _y: number) {
    const splitBy = obj.splitting(_x, _y);
    if (this.splitBy === splitBy) return;
    this.splitBy = splitBy;
    this.redraw(REDRAW.split);

    // remote
    updateBox(obj);
  }

  divide(obj: Box) {
    // splitBy が 0 ならば終了
    if (!this.splitBy) return;

    const charSets = [
      obj.label.substring(0, this.splitBy),
      obj.label.substring(this.splitBy),
    ];
    // box を新しく２つ作成
    const box1 = new Box(obj.x - 64, obj.y, charSets[0], 0, [], false);
    const box2 = new Box(obj.splittedX, obj.y, charSets[1], 0, [], false);

    // オブジェクトの更新
    // 旧 box の削除と 新 box の追加
    this.objs = [...this.objs.filter((o) => o.id !== obj.id), box2, box1];

    // remote
    deleteBox(obj.id);
    insertBox(box1);
    insertBox(box2);

    this.connectedObjSets = this.connectedObjSets.map((set) => {
      // 元の obj と無関係の connection はそのまま
      if (!set.includes(obj.id)) return set;

      // connection の相手を抽出
      const isDivideStart = set.indexOf(obj.id) === 0;
      const oppoObjId = isDivideStart ? set[1] : set[0];
      return isDivideStart ? [box2.id, oppoObjId] : [oppoObjId, box1.id];
    });

    // todo remote update connections

    // 関連 highlights の削除
    const clone = { ...this.highlights };
    delete clone[obj.id];
    this.highlights = clone;

    this.splitBy = 0;

    this.redraw(REDRAW.divide);
  }

  expand(obj: Box, _x: number, _y: number) {
    // 新しいboxを作成 ポインタの位置を中心にする
    const box = new Box(
      _x - BOX_MIN_WIDTH / 2,
      _y - BOX_HEIGHT / 2,
      '',
      0,
      [],
      true // 最初は非表示で
    );
    this.objs = [...this.objs, box];
    this.dragObj = box;
    this.dragDX = _x - box.x;
    this.dragDY = _y - box.y;
    this.expandObjId = box.id;
    this.expandStartObjId = obj.id;

    this.redraw(REDRAW.expand);

    // remote
    insertBox(box);
    updateField({
      id: CANVAS_FIELD_ID,
      expandObjId: box.id,
      expandStartObjId: obj.id,
    });
  }

  completeExpand() {
    if (!this.expandObj || !this.expandStartObj) return;
    // canvas
    this.connectedObjSets = [
      ...this.connectedObjSets,
      [this.expandObj.id, this.expandStartObj.id],
    ];

    this.expandObjId = null;
    this.expandStartObjId = null;
    this.dragObj = null;

    // todo remote add connetion
    this.redraw(REDRAW.completeExpand);
  }

  connect(obj: Box) {
    if (!this.expandObj || !this.expandStartObj) return;

    // エクスパンドで使っていた obj を削除
    this.selectObj = null;
    this.objs = this.objs.filter((o) => o.id !== this.expandObj?.id);

    // canvas
    this.connectedObjSets = [
      ...this.connectedObjSets,
      [this.expandStartObj.id, obj.id],
    ];

    this.expandObjId = null;
    this.expandStartObjId = null;
    this.dragObj = null;

    // todo remote add connectedObjSet

    this.redraw(REDRAW.connect);
  }

  updateMode(mode: string) {
    if (this.selectObj) {
      this.selectObj = null;
      this.handleSetSelectedObj(null);
    }
    this.mode = mode;
    this.redraw('update mode');
  }
}

function _isHidden(field: DraggableField) {
  if (!field.expandObj || !field.expandStartObj) return false;

  // expandObj が expandStartObj より後方に行った場合、描画しない
  if (field.expandObj.lineEndX > field.expandStartObj.lineStartX) return true;

  // expandObj が expandStartObj に接している時、描画しない
  if (boxCollision(field.expandObj, field.expandStartObj)) return true;

  return false;
}
