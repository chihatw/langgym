import {
  BOX_GAP,
  BOX_HEIGHT,
  BOX_MIN_WIDTH,
  CANVAS_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
} from '../constants';

export class DummyDOM {
  #x;
  #y;
  #container: HTMLDivElement;
  width: number;
  height: number;

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

    // 重複防止
    const old = document.querySelector('#dummyDOM');
    if (old) old.remove();

    const container = document.createElement('div');
    this.#container = container;

    container.id = 'dummyDOM';
    this._setContainerStyle(visible, container);
    this._createChildren(label, splitBy, document, container);
    document.body.appendChild(container);

    this.width = container.getBoundingClientRect().width;
    this.height = container.getBoundingClientRect().height;

    const chars: HTMLDivElement[] = [];
    for (const child of container.children) {
      for (const char of child.children) {
        chars.push(char as HTMLDivElement);
      }
    }

    console.log(chars);
  }

  // get chars() {
  //   // 高さは親と同じに
  //   const { height } = this.#container.getBoundingClientRect();

  //   const chars: Char[] = [];
  //   const middles = this.#container.children;

  //   for (let middle of middles) {
  //     const children = middle.children;
  //     for (let child of children) {
  //       const { left, width } = child.getBoundingClientRect();
  //       const char = new Char(
  //         this.#x + left, // Field 基準の Box.offsetX + Box.left
  //         this.#y,
  //         width,
  //         height,
  //         child.textContent || ''
  //       );
  //       chars.push(char);
  //     }
  //   }
  //   return chars;
  // }

  _setContainerStyle(visible: boolean | undefined, container: HTMLDivElement) {
    container.style.position = 'fixed';
    container.style.left = '0';
    container.style.backgroundColor = CANVAS_COLOR;
    container.style.padding = '1rem';
    container.style.fontSize = FONT_SIZE;
    container.style.height = BOX_HEIGHT;
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.gap = BOX_GAP;
    container.style.minWidth = BOX_MIN_WIDTH;
    container.style.fontFamily = FONT_FAMILY;

    if (!visible) {
      container.style.opacity = '0';
      container.style.top = '-9999px';
    }
  }
  _createChildren(
    label: string,
    splitBy: number,
    document: Document,
    container: HTMLDivElement
  ) {
    const charSets = splitBy
      ? [label.substring(0, splitBy), label.substring(splitBy)]
      : [label];

    for (let i = 0; i < charSets.length; i++) {
      const charSet = charSets[i];

      const middle = document.createElement('div');
      middle.style.display = 'flex';
      middle.style.alignItems = 'center';
      middle.style.justifyContent = 'center';
      container.appendChild(middle);

      for (let char of charSet) {
        const child = document.createElement('div');
        child.textContent = char;
        middle.appendChild(child);
      }
    }
  }
}
