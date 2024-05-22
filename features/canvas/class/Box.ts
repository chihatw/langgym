import { customAlphabet } from 'nanoid';
import { BG_COLOR, FONT_SIZE, SEGMENT } from '../constants';
import { CharDOM } from '../schema';
import { updateHighlights } from '../services/client';
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
  isHidden;
  splittedX = 0;
  highlights: number[] = [];

  splitBy = 0;

  constructor(
    x: number,
    y: number,
    label: string,
    splitBy: number,
    highlights: number[],
    isHidden: boolean,
    id?: number
  ) {
    const nanoid = customAlphabet('1234567890', 4);
    this.id = id || parseInt(nanoid(4));
    this.x = x;
    this.y = y;
    this.label = label;
    this.isHidden = isHidden;
    this.highlights = highlights;
    const { width, height, chars } = _setWidthHeightChars({
      label,
      splitBy,
      x,
      y,
      highlights,
    });
    this.width = width;
    (this.height = height), (this.chars = chars);
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

  updateLabel(label: string) {
    this.label = label;
    const { width, height, chars, x } = _setWidthHeightChars(this, this.width);
    this.x = x;
    this.width = width;
    this.height = height;
    this.chars = chars;
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

    const { width, height, chars } = _setWidthHeightChars(this);
    this.width = width;
    this.height = height;
    this.chars = chars;
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
    if (this.splitBy !== splitBy) {
      this.splitBy = splitBy;
      this.splittedX = splittedX;
      const { width, height, chars } = _setWidthHeightChars(this);
      this.width = width;
      this.height = height;
      this.chars = chars;
    }

    return this.splitBy;
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
    const { width, height, chars } = _setWidthHeightChars(this);
    this.width = width;
    this.height = height;
    this.chars = chars;

    // remote
    updateHighlights(this.id, this.highlights);
    return this.highlights;
  }

  dehighlight() {
    this.highlights = [];
    const { width, height, chars } = _setWidthHeightChars(this);
    this.width = width;
    this.height = height;
    this.chars = chars;

    // remote
    updateHighlights(this.id, []);
  }

  draw(ctx: CanvasRenderingContext2D) {
    let border = 'white';

    // body
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(this.x, this.y, this.width, this.height);

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

function _setWidthHeightChars(
  box: Pick<Box, 'label' | 'splitBy' | 'x' | 'y' | 'highlights'>,
  width_org?: number
) {
  let width = 0;
  let height = 0;
  let chars: Char[] = [];
  let new_x = box.x;

  const dummyDOM = new DummyDOM(box.label, box.splitBy);
  width = dummyDOM.width;
  height = dummyDOM.height;

  if (width_org) {
    const gap = width - width_org;
    new_x = new_x - gap / 2;
  }

  chars = _buildChars({ ...box, height, x: new_x }, dummyDOM.chars);
  return { width, height, chars, x: new_x };
}

function _buildChars(
  box: Pick<Box, 'height' | 'x' | 'y' | 'splitBy' | 'highlights'>,
  charDOMs: CharDOM[]
) {
  const chars = charDOMs.map(
    (c, index) =>
      new Char(
        box.x + c.left,
        box.y,
        c.width,
        box.height,
        c.label || '',
        index,
        index === box.splitBy - 1,
        box.highlights ? box.highlights.includes(index) : false
      )
  );
  return chars;
}
