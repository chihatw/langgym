import {
  ARROW_LENGTH,
  ARROW_MARGIN,
  ARROW_STROKE_WIDTH,
  ARROW_WIDTH,
} from '../constants';
import { Arrow } from './Arrow';
import { Box } from './Box';

export class ExpandArrow extends Arrow {
  draw(ctx: CanvasRenderingContext2D) {
    if (!this.startObj || !this.endObj) return;

    // box1, box2 が接触している場合、描画しない
    const _margin = ARROW_MARGIN + ARROW_LENGTH;
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
    const { startX, startY, endX, endY } = _calcStart(
      this.startObj,
      this.endObj,
      ARROW_MARGIN
    );

    _buildArrowPath(
      startX,
      startY,
      endX,
      endY,
      ctx,
      ARROW_STROKE_WIDTH,
      ARROW_LENGTH,
      ARROW_WIDTH
    );

    ctx.fill();
  }
}

function _calcStart(startObj: Box, endObj: Box, margin: number) {
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

    return {
      startX: startFromBottom
        ? startObj.lineStartX + startPoint_to_margin_dy * (out_dx / out_dy)
        : startObj.right + margin,
      startY: startFromBottom
        ? startObj.bottom + margin
        : startObj.lineStartY + startPoint_to_margin_dx * (out_dy / out_dx),
      endX: endObj.centerX,
      endY: endObj.ceneterY,
    };
  }

  // 起点の修正
  const startFromTop = tan_startPoint_to_margin < tan_arrow;

  return {
    startX: startFromTop
      ? startObj.lineStartX + startPoint_to_margin_dy * (out_dx / out_dy)
      : startObj.right + margin,
    startY: startFromTop
      ? startObj.y - margin
      : startObj.lineStartY - startPoint_to_margin_dx * (out_dy / out_dx),
    endX: endObj.centerX,
    endY: endObj.ceneterY,
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
