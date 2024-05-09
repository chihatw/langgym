import { updateBoxLabel, updateBoxXY } from '../services/client';

export class Box {
  #label = '';
  #color = '';

  #dom: null | HTMLDivElement = null;
  #isGrabed = false;

  pos = { x: 0, y: 0 };

  constructor(label: string, color: string) {
    this.#label = label;
    this.#color = color;

    const dom = createDummyDOM();
    if (!dom) return;

    dom.textContent = label;
    this.#dom = dom;
  }

  set label(label: string) {
    this.#label = label;
    this.#dom!.textContent = label;
  }

  setDataFromRemote(x: number, y: number, label: string, color: string) {
    this.pos = { x, y };
    this.#label = label;
    this.#color = color;
    this.#dom!.textContent = label;
  }

  updateLabel(label: string) {
    this.#label = label;
    this.#dom!.textContent = label;
    updateBoxLabel(label);
  }

  inBounds(x: number, y: number) {
    const { width, height } = this.#dom!.getBoundingClientRect();
    const result = checkIsMouseOver({ x, y }, { ...this.pos, width, height });
    return result;
  }

  select() {
    this.#isGrabed = true;
  }

  deselect() {
    this.#isGrabed = false;
  }

  dragging(x: number, y: number) {
    this.pos = { x, y };
    updateBoxXY(x, y);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.#isGrabed ? 'red' : this.#color;

    const rect = this.#dom!.getBoundingClientRect();

    ctx.fillRect(this.pos.x, this.pos.y, rect.width, rect.height);

    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.#label,
      this.pos.x + rect.width / 2,
      this.pos.y + rect.height / 2
    );

    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.pos.x, this.pos.y, rect.width, rect.height);
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
  rect: { x: number; y: number; width: number; height: number }
) {
  const isBetween_x = between(pos.x, rect.x, rect.x + rect.width);
  const isBetween_y = between(pos.y, rect.y, rect.y + rect.height);

  return isBetween_x && isBetween_y;
}

function between(target: number, min: number, max: number) {
  return target >= min && target <= max;
}
