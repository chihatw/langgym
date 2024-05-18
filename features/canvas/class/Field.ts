import { Box } from './Box';
import { Line } from './Line';

export class Field {
  #ctx;
  width;
  height;
  objs: Box[] = [];
  drawingLine: Line | null = null;
  connectedLines: Line[] = [];

  // コンストラクタで大きさを設定
  constructor(width: number, height: number, canvas: HTMLCanvasElement) {
    this.width = width;
    this.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error();
    this.#ctx = ctx;
    this._unBlur(width, height, canvas, ctx);
  }

  // https://web.dev/articles/canvas-hidipi?hl=ja
  _unBlur(
    width: number,
    height: number,

    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    const dpr = window.devicePixelRatio || 1;

    // dpr に合わせて canvas の実体を拡大
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // canvas の見た目は transform で縮小して元の大きさに戻す
    canvas.style.transform = `scale(${1 / dpr},${1 / dpr})`;
  }

  redraw(debug: string) {
    if (!this.#ctx) throw new Error();

    if (debug !== 'loop') console.log(debug);

    this.#ctx.clearRect(0, 0, this.width, this.height);
    for (const line of this.connectedLines) line.draw(this.#ctx);
    if (this.drawingLine) this.drawingLine.draw(this.#ctx);
    for (const obj of this.objs) obj.draw(this.#ctx);
  }

  loop() {
    this.redraw('loop');
    requestAnimationFrame(() => this.loop());
  }
}
