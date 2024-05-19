import {
  BOX_GAP,
  BOX_HEIGHT,
  BOX_MIN_WIDTH,
  BOX_X_PADDING,
  CANVAS_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
} from '../constants';
import { CharDOM } from '../schema';

const ID = 'dummyDOM';

export class DummyDOM {
  width: number;
  height: number;
  label: string | null;
  chars: CharDOM[];
  splitBy: number;

  constructor(label: string, splitBy: number) {
    this.label = label;
    this.splitBy = splitBy;

    const container = document.createElement('div');

    container.id = ID;
    this._setContainerStyle(container);
    this._createChildren(label, splitBy, document, container);
    document.body.appendChild(container);

    this.width = container.getBoundingClientRect().width;
    this.height = container.getBoundingClientRect().height;

    const chars: CharDOM[] = [];
    for (const child of container.children) {
      for (const char of child.children) {
        const charDiv = char as HTMLDivElement;
        const { left, width } = charDiv.getBoundingClientRect();
        chars.push({ label: charDiv.textContent, left, width });
      }
    }
    this.chars = chars;

    // 計算後はDOMを破棄
    const dom = document.querySelector(`#${ID}`);
    if (dom) dom.remove();
  }

  _setContainerStyle(container: HTMLDivElement) {
    container.style.position = 'fixed';
    container.style.left = '0';
    container.style.backgroundColor = CANVAS_COLOR;
    container.style.paddingLeft = `${BOX_X_PADDING}px`;
    container.style.paddingRight = `${BOX_X_PADDING}px`;
    container.style.fontSize = `${FONT_SIZE}px`;
    container.style.height = `${BOX_HEIGHT}px`;
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.gap = `${BOX_GAP}px`;
    container.style.minWidth = `${BOX_MIN_WIDTH}px`;
    container.style.fontFamily = FONT_FAMILY;

    // 表示を隠す
    container.style.opacity = '0';
    container.style.top = '-9999px';
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
