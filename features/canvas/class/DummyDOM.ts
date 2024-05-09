import {
  BOX_GAP,
  BOX_HEIGHT,
  BOX_MIN_WIDTH,
  CANVAS_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
} from '../constants';
import { Char } from './Char';

export class DummyDOM {
  #x;
  #y;
  #document: Document;
  #container: HTMLDivElement;

  constructor(
    x: number,
    y: number,
    label: string,
    document: Document,
    splitBy: number,
    visible?: boolean
  ) {
    this.#x = x;
    this.#y = y;
    this.#document = document;

    // 重複防止
    const old = this.#document.querySelector('#dummyDOM');
    if (old) old.remove();

    const container = this.#document.createElement('div');
    this.#container = container;

    this.#container.id = 'dummyDOM';
    this._setContainerStyle(visible);
    this._createChildren(label, splitBy);
    document.body.appendChild(container);
  }

  get chars() {
    // 高さは親と同じに
    const { height } = this.#container.getBoundingClientRect();

    const chars: Char[] = [];
    const middles = this.#container.children;

    for (let middle of middles) {
      const children = middle.children;
      for (let child of children) {
        const { left, width } = child.getBoundingClientRect();
        const char = new Char(
          this.#x + left, // Field 基準の Box.offsetX + Box.left
          this.#y,
          width,
          height,
          child.textContent || ''
        );
        chars.push(char);
      }
    }
    return chars;
  }

  get width() {
    return this.#container.getBoundingClientRect().width;
  }

  get height() {
    return this.#container.getBoundingClientRect().height;
  }

  _setContainerStyle(visible: boolean | undefined) {
    this.#container.style.position = 'fixed';
    this.#container.style.left = '0';
    this.#container.style.backgroundColor = CANVAS_COLOR;
    this.#container.style.padding = '1rem';
    this.#container.style.fontSize = FONT_SIZE;
    this.#container.style.height = BOX_HEIGHT;
    this.#container.style.display = 'flex';
    this.#container.style.alignItems = 'center';
    this.#container.style.justifyContent = 'center';
    this.#container.style.gap = BOX_GAP;
    this.#container.style.minWidth = BOX_MIN_WIDTH;
    this.#container.style.fontFamily = FONT_FAMILY;

    if (!visible) {
      this.#container.style.opacity = '0';
      this.#container.style.top = '-9999';
    }
  }
  _createChildren(label: string, splitBy: number) {
    const charSets = splitBy
      ? [label.substring(0, splitBy), label.substring(splitBy)]
      : [label];

    for (let i = 0; i < charSets.length; i++) {
      const charSet = charSets[i];

      const middle = this.#document.createElement('div');
      middle.style.display = 'flex';
      middle.style.alignItems = 'center';
      middle.style.justifyContent = 'center';
      this.#container.appendChild(middle);

      for (let char of charSet) {
        const child = this.#document.createElement('div');
        child.textContent = char;
        middle.appendChild(child);
      }
    }
  }
}
