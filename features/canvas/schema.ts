export interface CanvasBox {
  id: number;
  x: number;
  y: number;
  label: string;
  splitBy: number;
  highlights: number[];
}

export interface CanvasBox_New {
  id: number;
  x: number;
  y: number;
  label: string;
  splitBy: number;
  highlights: number[];
  isHidden: boolean;
}

export interface CharDOM {
  label: string | null;
  left: number;
  width: number;
}

export interface CanvasLine {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  startObjId: number;
  startCharIndex: number;
  endObjId: number | null;
  endCharIndex: number | null;
}
