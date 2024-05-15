import {
  DIVIDER_COLOR,
  DIVIDER_DASH,
  DIVIDER_GAP,
  DIVIDER_WIDTH,
  FONT_FAMILY,
  FONT_SIZE,
  TEXT_COLOR,
} from '../constants';
import { checkIsMouseOver } from '../services/utils';

export class Char {
  x;
  y;
  width;
  height;
  label;
  index;
  hasLine;
  isHighlight = false; // todo どこで設定？ constructor? method?

  constructor(
    x: number, // Field 基準の Box.offsetX + Box.left
    y: number,
    width: number,
    height: number,
    label: string,
    index: number,
    hasLine: boolean
  ) {
    this.x = x; // Field 基準の Box.x + char.left
    this.y = y; // Field 基準の Box.y
    this.width = width; // char.width
    this.height = height; // Box.height
    this.label = label;
    this.index = index;
    this.hasLine = hasLine;
  }

  // mousemove -> Box.splitting() から呼び出される
  inBounds(x: number, y: number) {
    const isInSide = checkIsMouseOver(
      { x, y },
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.hasLine = isInSide; // 運用では直後に dummyDOM 作成して、Char を新しく作り直しているので、ここでの代入は不要
    return isInSide;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.font = `${FONT_SIZE} ${FONT_FAMILY}`;

    ctx.fillStyle = TEXT_COLOR;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2);

    if (!this.hasLine) return;

    const right = this.x + this.width + DIVIDER_GAP;

    ctx.beginPath();
    ctx.lineWidth = DIVIDER_WIDTH;
    ctx.strokeStyle = DIVIDER_COLOR;
    ctx.setLineDash(DIVIDER_DASH);
    ctx.moveTo(right, this.y);
    ctx.lineTo(right, this.y + this.height);
    ctx.stroke();
  }
}
