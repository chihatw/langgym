export interface CanvasField {
  id: number;
  expandObjId: number | undefined;
  expandStartObjId: number | undefined;
}

export interface CanvasBox {
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
