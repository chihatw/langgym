import { updateBoxLabel, updateBoxXY } from '../services/client';

export class Box {
  #pos = { x: 0, y: 0 };
  #label = '';
  #color = '';

  #dom: null | HTMLDivElement = null;
  #dpr = 0;
  #grab = { x: 0, y: 0 };
  #isGrabed = false;
  #isMouseOver = false;

  constructor(label: string, color: string) {
    this.#label = label;
    this.#color = color;

    const dom = createDummyDOM();
    if (!dom) return;

    dom.textContent = label;
    this.#dom = dom;
  }

  set dpr(dpr: number) {
    this.#dpr = dpr;
  }

  set label(label: string) {
    this.#label = label;
    this.#dom!.textContent = label;
  }

  setDataFromRemote(x: number, y: number, label: string, color: string) {
    this.#pos = { x, y };
    this.#label = label;
    this.#color = color;
  }

  getMousePos(mouseX: number, mouseY: number) {
    // マウスオーバーの確認
    const { width, height } = this.#dom!.getBoundingClientRect();
    this.#isMouseOver = checkIsMouseOver(
      { x: mouseX, y: mouseY },
      { ...this.#pos, width, height },
      this.#dpr
    );

    // グラッブしていれば、位置を変更
    if (this.#isGrabed) {
      const x = Math.max(Math.round(mouseX / this.#dpr - this.#grab.x), 0);
      const y = Math.max(Math.round(mouseY / this.#dpr - this.#grab.y), 0);
      this.#pos = { x, y };
      updateBoxXY(x, y);
    }
  }

  updateLabel(label: string) {
    this.#label = label;
    this.#dom!.textContent = label;
    updateBoxLabel(label);
  }

  grab(x: number, y: number) {
    if (!this.#isMouseOver) return;

    this.#isGrabed = true;

    this.#grab.x = x / this.#dpr - this.#pos.x;
    this.#grab.y = y / this.#dpr - this.#pos.y;
  }

  ungrab() {
    this.#isGrabed = false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#isGrabed
      ? 'red'
      : this.#isMouseOver
      ? 'purple'
      : this.#color;

    const rect = this.#dom!.getBoundingClientRect();

    ctx.fillRect(this.#pos.x, this.#pos.y, rect.width, rect.height);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.#label,
      this.#pos.x + rect.width / 2,
      this.#pos.y + rect.height / 2
    );

    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.#pos.x, this.#pos.y, rect.width, rect.height);
  }
}

function createDummyDOM() {
  if (typeof document === 'undefined') return;
  const dom = document.createElement('div');
  dom.style.position = 'fixed';
  dom.style.left = '0';
  dom.style.backgroundColor = 'rgb(255 255 255 / 0.6)';
  dom.style.padding = '0.5rem';
  dom.style.margin = '0.5rem';
  dom.style.height = '2.5rem';
  dom.style.display = 'flex';
  dom.style.alignItems = 'center';
  dom.style.minWidth = '6rem';
  dom.style.justifyContent = 'center';
  dom.style.opacity = '0';
  dom.style.top = '-9999';
  document.body.appendChild(dom);
  return dom;
}

function checkIsMouseOver(
  pos: { x: number; y: number },
  rect: { x: number; y: number; width: number; height: number },
  dpr: number
) {
  const _x = pos.x / dpr;
  const _y = pos.y / dpr;
  const left = _x > rect.x;
  const right = _x < rect.x + rect.width;
  const top = _y > rect.y;
  const buttom = _y < rect.y + rect.height;
  return [left, right, top, buttom].every(Boolean);
}
