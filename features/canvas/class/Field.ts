import { Arrow } from './Arrow';
import { Box } from './Box';
import { ExpandArrow } from './ExpandArrow';

export class Field {
  #ctx;
  width;
  height;
  objs: Box[] = [];
  expandObj: Box | null = null;
  expandStartObj: Box | null = null;
  connectedObjSets: number[][] = []; // [startObj, endObj] の順

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

    // expand があれば arrow を表示
    if (this.expandObj && this.expandStartObj) {
      const arrow =
        this.expandObj.lineEndX <= this.expandStartObj.lineStartX
          ? new Arrow(this.expandObj, this.expandStartObj)
          : new ExpandArrow(this.expandObj, this.expandStartObj);
      arrow.draw(this.#ctx);
    }

    for (const connectedObjSet of this.connectedObjSets) {
      const box1 = this.objs.find((o) => o.id === connectedObjSet.at(0));
      const box2 = this.objs.find((o) => o.id === connectedObjSet.at(1));
      if (!box1 || !box2) continue;
      const arrow = new Arrow(box1, box2);
      arrow.draw(this.#ctx);
    }

    for (const obj of this.objs) {
      if (obj.isHidden) continue;
      obj.draw(this.#ctx);
    }
  }

  loop() {
    this.redraw('loop');
    requestAnimationFrame(() => this.loop());
  }
}
