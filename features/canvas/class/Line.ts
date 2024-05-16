import { customAlphabet } from 'nanoid';

export class Line {
  id;
  startX;
  startY;
  endX;
  endY;
  startObjId;
  startCharIndex;
  endObjId;
  endCharIndex;

  constructor(
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    startObjId: number,
    startCharIndex: number,
    endObjId: number | null,
    endCharIndex: number | null,
    id?: number
  ) {
    const nanoid = customAlphabet('1234567890', 4);
    this.id = id || parseInt(nanoid(4));
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.startObjId = startObjId;
    this.startCharIndex = startCharIndex;
    this.endObjId = endObjId;
    this.endCharIndex = endCharIndex;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.moveTo(this.startX, this.startY);
    ctx.lineTo(this.endX, this.endY);
    ctx.stroke();
  }
}
