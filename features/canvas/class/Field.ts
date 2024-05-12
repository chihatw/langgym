import { Box } from './Box';

export class Field {
  #canvas: HTMLCanvasElement | null = null;
  #ctx: CanvasRenderingContext2D | null = null;
  #rect = { width: 0, height: 0 };

  dpr = 0;
  objs: Box[] = [];

  // コンストラクタで大きさを持つ
  constructor(width: number, height: number) {
    this.#rect = { width, height };
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.#canvas = canvas;
    this.#ctx = this.#canvas.getContext('2d');

    /**
     * 文字をぼやけさせないため
     */

    // https://web.dev/articles/canvas-hidipi?hl=ja
    const dpr = window.devicePixelRatio || 1;
    this.dpr = dpr;

    // dpr に合わせて canvas の実体を拡大
    canvas.width = this.#rect.width * this.dpr;
    canvas.height = this.#rect.height * this.dpr;
    this.#ctx?.scale(this.dpr, this.dpr);

    // canvas の見た目は transform で縮小して元の大きさに戻す
    canvas.style.transform = `scale(${1 / this.dpr},${1 / this.dpr})`;
  }

  add(obj: Box) {
    this.objs.push(obj);
  }

  redraw() {
    if (!this.#ctx || !this.#canvas) return;
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    for (let obj of this.objs) obj.draw(this.#ctx);
  }

  loop() {
    this.redraw();
    requestAnimationFrame(() => this.loop());
  }

  start() {
    this.loop();
  }
}
