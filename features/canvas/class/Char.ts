import {
  BG_COLOR,
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
  #x;
  #y;
  #width;
  #height;
  #color = BG_COLOR;

  #label;

  constructor(
    x: number, // Field 基準の Box.offsetX + Box.left
    y: number,
    width: number,
    height: number,
    label: string
  ) {
    this.#x = x;
    this.#y = y;
    this.#width = width;
    this.#height = height;
    this.#label = label;
  }

  get label() {
    return this.#label;
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

  draw(ctx: CanvasRenderingContext2D, hasLine: boolean) {
    ctx.fillStyle = this.#color;
    ctx.fillRect(this.#x, this.#y, this.#width, this.#height);
    ctx.font = `${FONT_SIZE} ${FONT_FAMILY}`;

    ctx.fillStyle = TEXT_COLOR;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.#label,
      this.#x + this.#width / 2,
      this.#y + this.#height / 2
    );

    if (!hasLine) return;

    const x = this.#x + this.#width + DIVIDER_GAP;

    ctx.beginPath();
    ctx.lineWidth = DIVIDER_WIDTH;
    ctx.strokeStyle = DIVIDER_COLOR;
    ctx.setLineDash(DIVIDER_DASH);
    ctx.moveTo(x, this.#y);
    ctx.lineTo(x, this.#y + this.#height);
    ctx.stroke();
  }
}
