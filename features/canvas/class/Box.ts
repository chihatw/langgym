import { customAlphabet } from 'nanoid';
import { BG_COLOR } from '../constants';
import { CharDOM } from '../schema';
import {
  insertBox,
  updateBoxLabel,
  updateBoxXY,
  updateSplitBy,
} from '../services/client';
import { checkIsMouseOver } from '../services/utils';
import { Char } from './Char';
import { DummyDOM } from './DummyDOM';

export class Box {
  id;
  x;
  y;
  label;
  chars: Char[] = [];
  width = 0;
  height = 0;

  #isGrabed = false;
  #isSelected = false;
  #charInBounds: null | Char = null;

  constructor(
    x: number,
    y: number,
    label: string,
    splitBy: number,
    id?: number
  ) {
    const nanoid = customAlphabet('1234567890', 4);
    this.id = id || parseInt(nanoid(4));
    this.x = x;
    this.y = y;
    this.label = label;
    this._setWidthHeightChars(label, splitBy);
    if (!id) {
      // update remote
      insertBox({ id: this.id, x, y, label, splitBy });
    }
  }

  updateLabel(label: string) {
    this.label = label;
    this._setWidthHeightChars(label, 0);
    // remote
    updateBoxLabel(this.id, label);
  }

  inBounds(x: number, y: number) {
    const result = checkIsMouseOver(
      { x, y },
      this.x,
      this.y,
      this.width,
      this.height
    );
    return result;
  }

  // カーソルが何文字目の上にあるのかをチェック
  charInBounds(x: number, y: number) {
    let charInBounds: null | Char = null;
    // 最後尾は除外
    for (let i = 0; i < this.chars.length - 1; i++) {
      const char = this.chars[i];

      if (char.inBounds(x, y)) {
        charInBounds = char;
      }
    }

    const hasChanged = this._checkHasChange(charInBounds);

    if (hasChanged) {
      this.#charInBounds = charInBounds;
      const splitBy = this.#charInBounds ? this.#charInBounds.index + 1 : 0;
      this._setWidthHeightChars(this.label, splitBy);
      // remote
      updateSplitBy(this.id, splitBy);
    }

    return this.#charInBounds;
  }

  grab() {
    this.#isGrabed = true;
  }

  ungrab() {
    this.#isGrabed = false;
  }

  select() {
    this.#isSelected = true;
  }

  deselect() {
    this.#isSelected = false;
  }

  _checkHasChange(charInBounds: Char | null) {
    let hasChanged = false;
    if (this.#charInBounds) {
      if (charInBounds) {
        hasChanged = this.#charInBounds.index !== charInBounds.index;
      } else {
        hasChanged = true;
      }
    } else {
      hasChanged = !!charInBounds;
    }
    return hasChanged;
  }

  _buildChars(
    x: number,
    y: number,
    height: number,
    charDOMs: CharDOM[],
    splitBy: number
  ) {
    const chars = charDOMs.map(
      (c, index) =>
        new Char(
          x + c.left,
          y,
          c.width,
          height,
          c.label || '',
          index,
          index === splitBy - 1
        )
    );
    return chars;
  }

  _setWidthHeightChars(label: string, splitBy: number) {
    const dummyDOM = new DummyDOM(label, splitBy);
    this.width = dummyDOM.width;
    this.height = dummyDOM.height;
    this.chars = this._buildChars(
      this.x,
      this.y,
      dummyDOM.height,
      dummyDOM.chars,
      splitBy
    );
  }

  dragging(x: number, y: number) {
    this.x = x;
    this.y = y;

    this._setWidthHeightChars(this.label, 0);

    // remote
    updateBoxXY(this.id, x, y);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.#isGrabed || this.#isSelected) {
      ctx.strokeStyle = this.#isSelected ? 'red' : 'black';
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    for (let i = 0; i < this.chars.length; i++) {
      const char = this.chars[i];
      char.draw(ctx);
    }
  }
}
