import { Box } from './Box';

// https://qiita.com/frogcat/items/2f94b095b4c2d8581ff6
const strokeWidth = 4;
const arrowLength = 12;
const arrowWidth = 9;
const margin = 8;

export class Arrow {
  startObj;
  endObj;
  constructor(box1: Box, box2: Box) {
    if (box1.lineStartX < box2.lineEndX) {
      this.startObj = box1;
      this.endObj = box2;
    } else if (box2.lineStartX < box1.lineEndX) {
      this.startObj = box2;
      this.endObj = box1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.startObj || !this.endObj) return;
    // box1, box2 が接触している場合、描画しない
    const _margin = margin + arrowLength;
    const points = [
      [this.startObj.centerX, this.startObj.ceneterY],
      [this.startObj.x - _margin, this.startObj.y - _margin],
      [this.startObj.centerX, this.startObj.y - _margin],
      [this.startObj.right + _margin, this.startObj.y - _margin],
      [this.startObj.right + _margin, this.startObj.ceneterY],
      [this.startObj.x - _margin, this.startObj.bottom + _margin],
      [this.startObj.centerX, this.startObj.bottom + _margin],
      [this.startObj.right + _margin, this.startObj.bottom + _margin],
      [this.startObj.x - _margin, this.startObj.ceneterY],
    ];

    const inBounds = points.some((p) =>
      this.endObj!.inBounds(p.at(0) || 0, p.at(1) || 0)
    );
    if (inBounds) return;

    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,0,0,0.2)';

    // 始点、終点の調整
    const { startX, startY, endX, endY } = _calcStartEnd(
      this.startObj,
      this.endObj,
      margin
    );

    _buildArrowPath(
      startX,
      startY,
      endX,
      endY,
      ctx,
      strokeWidth,
      arrowLength,
      arrowWidth
    );

    ctx.fill();
  }
}

function _calcStartEnd(startObj: Box, endObj: Box, margin: number) {
  const startObj_plus_margin = {
    x: startObj.right + margin,
    y: startObj.bottom + margin,
  };

  const endObj_minus_margin = {
    x: endObj.x - margin,
    y: endObj.y - margin,
  };

  const startPoint_to_margin_dx = Math.abs(
    startObj_plus_margin.x - startObj.lineStartX
  );
  const startPoint_to_margin_dy = Math.abs(
    startObj_plus_margin.y - startObj.lineStartY
  );
  const endPoint_to_margin_dx = Math.abs(
    endObj.lineEndX - endObj_minus_margin.x
  );
  const endPoint_to_margin_dy = Math.abs(
    endObj.lineEndY - endObj_minus_margin.y
  );

  const tan_startPoint_to_margin =
    startPoint_to_margin_dy / startPoint_to_margin_dx;
  const tan_endObj = endPoint_to_margin_dy / endPoint_to_margin_dx;

  const tan_arrow = Math.abs(
    (endObj.lineEndY - startObj.lineStartY) /
      (endObj.lineEndX - startObj.lineStartX)
  );

  const out_dx = Math.abs(endObj.lineEndX - startObj.lineStartX);
  const out_dy = Math.abs(endObj.lineEndY - startObj.lineStartY);

  if (startObj.lineStartY < endObj.lineEndY) {
    const startFromBottom = tan_startPoint_to_margin < tan_arrow;
    const endFromTop = tan_endObj < tan_arrow;

    return {
      startX: startFromBottom
        ? startObj.lineStartX + startPoint_to_margin_dy * (out_dx / out_dy)
        : startObj.right + margin,
      startY: startFromBottom
        ? startObj.bottom + margin
        : startObj.lineStartY + startPoint_to_margin_dx * (out_dy / out_dx),
      endX: endFromTop
        ? endObj.lineEndX - endPoint_to_margin_dy * (out_dx / out_dy)
        : endObj.x - margin,
      endY: endFromTop
        ? endObj.y - margin
        : endObj.lineEndY - endPoint_to_margin_dx * (out_dy / out_dx),
    };
  }

  // 起点の修正
  const startFromTop = tan_startPoint_to_margin < tan_arrow;
  const endFromBottom = tan_endObj < tan_arrow;

  return {
    startX: startFromTop
      ? startObj.lineStartX + startPoint_to_margin_dy * (out_dx / out_dy)
      : startObj.right + margin,
    startY: startFromTop
      ? startObj.y - margin
      : startObj.lineStartY - startPoint_to_margin_dx * (out_dy / out_dx),
    endX: endFromBottom
      ? endObj.lineEndX - endPoint_to_margin_dy * (out_dx / out_dy)
      : endObj.x - margin,
    endY: endFromBottom
      ? endObj.bottom + margin
      : endObj.lineEndY + endPoint_to_margin_dx * (out_dy / out_dx),
  };
}

function _buildArrowPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  ctx: CanvasRenderingContext2D,
  strokeWidth: number,
  arrowLength: number,
  arrowWidth: number
) {
  const controlPoints = [
    0,
    strokeWidth / 2,
    -1 * arrowLength,
    strokeWidth / 2,
    -1 * arrowLength,
    arrowWidth,
  ];

  var dx = endX - startX;
  var dy = endY - startY;
  var len = Math.sqrt(dx * dx + dy * dy);
  var sin = dy / len;
  var cos = dx / len;
  var a: number[] = [];
  a.push(0, 0); // 始点

  // 矢印の半分の計算
  for (var i = 0; i < controlPoints.length; i += 2) {
    var x = controlPoints[i];
    var y = controlPoints[i + 1];
    a.push(x < 0 ? len + x : x, y);
  }

  // 終点
  a.push(len, 0);

  // 矢印の残り半分の計算
  for (var i = controlPoints.length; i > 0; i -= 2) {
    var x = controlPoints[i - 2];
    var y = controlPoints[i - 1];
    a.push(x < 0 ? len + x : x, -y);
  }

  a.push(0, 0); // 始点に戻る

  // 描画
  for (var i = 0; i < a.length; i += 2) {
    var x = a[i] * cos - a[i + 1] * sin + startX;
    var y = a[i] * sin + a[i + 1] * cos + startY;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
}
