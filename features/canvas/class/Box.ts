import { customAlphabet } from 'nanoid';
import { BG_COLOR, FONT_SIZE, SEGMENT } from '../constants';
import { CharDOM } from '../schema';
import {
  insertBox,
  updateBoxLabel,
  updateBoxXY,
  updateHighlights,
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
  splittedX = 0;

  #splitBy = 0;
  highlights: number[] = [];

  constructor(
    x: number,
    y: number,
    label: string,
    splitBy: number,
    highlights: number[],
    id?: number
  ) {
    const nanoid = customAlphabet('1234567890', 4);
    this.id = id || parseInt(nanoid(4));
    this.x = x;
    this.y = y;
    this.label = label;
    this.highlights = highlights;
    this._setWidthHeightChars(label, splitBy);
    if (!id) {
      // update remote
      insertBox({
        id: this.id,
        x,
        y,
        label,
        splitBy,
        highlights: [],
      });
    }
  }

  get bottom() {
    return this.y + this.height;
  }

  get right() {
    return this.x + this.width;
  }

  get centerX() {
    return this.x + this.width / 2;
  }

  get ceneterY() {
    return this.y + this.height / 2;
  }

  get lineStartX() {
    const lastChar = this.chars.at(-1);
    if (!lastChar) return this.centerX;
    return lastChar.centerX;
  }
  get lineStartY() {
    return this.y + this.height / 2;
  }
  get lineEndX() {
    const firstChar = this.chars.at(0);
    if (!firstChar) return this.centerX;
    return firstChar.centerX;
  }
  get lineEndY() {
    return this.y + this.height / 2;
  }

  getSegment(x: number) {
    if (x < this.x || x > this.x + this.width) return '';
    if (x <= this.x + FONT_SIZE) {
      return SEGMENT.header;
    }
    if (x <= this.x + this.width - FONT_SIZE) {
      return SEGMENT.body;
    }
    return SEGMENT.handle;
  }

  // will delete
  nthCenterX(index: number) {
    const targetChar = this.chars.find((c) => c.index === index);
    if (targetChar) return targetChar.centerX;
    // targetChar がない場合は box の中心を返す
    return this.x + this.width / 2;
  }

  // will delete
  nthCenterY(index: number) {
    const targetChar = this.chars.find((c) => c.index === index);
    if (targetChar) return targetChar.centerY;
    // targetChar がない場合は box の中心を返す
    return this.y + this.height / 2;
  }

  updateLabel(label: string) {
    this.label = label;
    this._setWidthHeightChars(label, 0, this.width);
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

  dragging(x: number, y: number) {
    this.x = x;
    this.y = y;

    this._setWidthHeightChars(this.label, 0);

    // remote
    updateBoxXY(this.id, x, y);
  }

  // 座標がどの Char の上かチェック
  indexOf(x: number, y: number) {
    for (let i = 0; i < this.chars.length; i++) {
      const char = this.chars[i];
      // カーソルの下に char があれば、index + 1 を splitBy に代入
      if (char.inBounds(x, y)) return char.index;
    }
    return -1;
  }

  // どこで分割されているのかチェック
  splitting(x: number, y: number) {
    const index = this.indexOf(x, y);

    let splitBy = 0;
    let splittedX = 0;
    // 最後尾は除外
    if (index !== -1 && index < this.chars.length - 1) {
      splitBy = index + 1;
      splittedX = this.chars[splitBy].x;
    }

    // 分割が変更されている場合、大きさを再計算して、リモートも更新
    if (this.#splitBy !== splitBy) {
      this.#splitBy = splitBy;
      this.splittedX = splittedX;
      this._setWidthHeightChars(this.label, this.#splitBy);
      // remote
      updateSplitBy(this.id, this.#splitBy);
    }

    return this.#splitBy;
  }

  // 追加だけ（削除はしない）
  highlighting(x: number, y: number) {
    let highlight: number | null = null;
    for (let i = 0; i < this.chars.length; i++) {
      const char = this.chars[i];
      // カーソルの下に char があれば、highlight
      if (char.inBounds_for_highlight(x, y)) {
        highlight = char.index;
      }
    }

    const result = [...this.highlights];
    if (typeof highlight === 'number') result.push(highlight);
    // 重複をなくして、sort
    this.highlights = Array.from(new Set(result)).sort((a, b) => a - b);
    this._setWidthHeightChars(this.label, this.#splitBy);

    // remote
    updateHighlights(this.id, this.highlights);
    return this.highlights;
  }

  dehighlight() {
    this.highlights = [];
    this._setWidthHeightChars(this.label, this.#splitBy);

    // remote
    updateHighlights(this.id, []);
  }

  _buildChars(
    x: number,
    y: number,
    height: number,
    charDOMs: CharDOM[],
    splitBy: number,
    highlights?: number[]
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
          index === splitBy - 1,
          highlights ? highlights.includes(index) : false
        )
    );
    return chars;
  }

  _setWidthHeightChars(label: string, splitBy: number, width_org?: number) {
    const dummyDOM = new DummyDOM(label, splitBy);
    this.width = dummyDOM.width;
    this.height = dummyDOM.height;

    if (width_org) {
      const gap = this.width - width_org;
      this.x = this.x - gap / 2;
    }

    this.chars = this._buildChars(
      this.x,
      this.y,
      dummyDOM.height,
      dummyDOM.chars,
      splitBy,
      this.highlights
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    let border = 'white';

    // body
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(
      this.x + FONT_SIZE,
      this.y,
      this.width - FONT_SIZE * 2,
      this.height
    );

    // header 先頭から 1字分
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, FONT_SIZE, this.height);

    // handle 後ろから 1字分
    ctx.fillStyle = 'blue';
    ctx.fillRect(
      this.x + this.width - FONT_SIZE,
      this.y,
      FONT_SIZE,
      this.height
    );

    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    // char を描画
    for (let i = 0; i < this.chars.length; i++) {
      const char = this.chars[i];
      char.draw(ctx);
    }
  }
}
