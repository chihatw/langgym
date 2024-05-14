export interface CanvasBox {
  id: number;
  x: number;
  y: number;
  label: string;
  splitBy: number;
}

export interface CharDOM {
  label: string | null;
  left: number;
  width: number;
}
