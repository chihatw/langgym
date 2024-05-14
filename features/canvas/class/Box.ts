import { updateBoxLabel, updateBoxXY } from '../services/client';
import { checkIsMouseOver } from '../services/utils';
import { Char } from './Char';
import { DummyDOM } from './DummyDOM';

export class Box {
  #x;
  #y;
  #color;
  #isSelected = false;

  #width = 0;
  #height = 0;
  #splitBy = 0; // 何文字目の"前"で区切るか

  #chars: Char[] = [];

  constructor(x: number, y: number, label: string, color: string) {
    this.#x = x;
    this.#y = y;
    this.#color = color;
    this._updateChars(label);
  }

  setLabel(label: string) {
    this._updateChars(label);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get chars() {
    return this.#chars;
  }

  updateLabel(label: string) {
    this._updateChars(label);

    // remote
    updateBoxLabel(label);
  }

  inBounds(x: number, y: number) {
    const result = checkIsMouseOver(
      { x, y },
      this.#x,
      this.#y,
      this.#width,
      this.#height
    );
    return result;
  }

  // カーソルが何文字目の上にあるのかをチェック
  splitBy(x: number, y: number) {
    let splitBy = 0;
    // 最後尾は除外
    for (let i = 0; i < this.#chars.length - 1; i++) {
      const char = this.#chars[i];
      if (char.inBounds(x, y)) {
        splitBy = i + 1;
      }
    }
    if (this.#splitBy !== splitBy) {
      this.#splitBy = splitBy;
      this._updateChars();
    }
    return splitBy;
  }

  select() {
    this.#isSelected = true;
  }

  deselect() {
    this.#isSelected = false;
  }

  dragging(x: number, y: number) {
    this.#x = x;
    this.#y = y;
    updateBoxXY(x, y);

    this._updateChars();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(this.#x, this.#y, this.#width, this.#height);

    if (this.#isSelected) {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.strokeRect(this.#x, this.#y, this.#width, this.#height);
    }

    for (let i = 0; i < this.#chars.length; i++) {
      const char = this.#chars[i];
      char.draw(ctx, this.#splitBy === i + 1);
    }
  }

  _updateChars(newLabel?: string) {
    if (typeof document === 'undefined') return;

    const label =
      typeof newLabel === 'undefined'
        ? this.#chars.map((char) => char.label).join('')
        : newLabel;

    const dummyDOM = new DummyDOM(
      this.#x,
      this.#y,
      label,
      document,
      this.#splitBy,
      false // debug
    );
    this.#width = dummyDOM.width;
    this.#height = dummyDOM.height;
    // this.#chars = dummyDOM.chars;
  }
}
