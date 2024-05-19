import { Box } from './Box';

// https://qiita.com/frogcat/items/2f94b095b4c2d8581ff6
const strokeWidth = 2;
const arrowLength = 8;
const arrowWidth = 4;
const margin = 8;

export class Arrow {
  startObj;
  endObj;
  constructor(box1: Box, box2: Box) {
    if (box1.centerX < box2.centerX) {
      this.startObj = box1;
      this.endObj = box2;
    } else {
      this.startObj = box2;
      this.endObj = box1;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0,0,0,0.4)';

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
  // 始点、終点の調整
  let startX = startObj.lineStartX;
  let startY = startObj.lineStartY;
  let endX = endObj.lineEndX;
  let endY = endObj.lineEndY;
  // box の下辺から
  if (startObj.y + startObj.height < endObj.y - margin * 2) {
    startY = startObj.y + startObj.height + margin;
    if (startObj.x + startObj.width > endObj.x) {
      // box の上辺に繋げる
      endY = endObj.y - margin;
    } else {
      // box の左辺につなげる
      endX = endObj.x - margin;
    }
  }
  // box の上辺から box の下辺に繋げる
  else if (startObj.y > endObj.y + endObj.height + margin * 2) {
    startY = startObj.y - margin;
    if (startObj.x + startObj.width > endObj.x) {
      // box の下辺に繋げる
      endY = endObj.y + endObj.height + margin;
    } else {
      // box の左辺につなげる
      endX = endObj.x - margin;
    }
  }
  // box の右辺から box の左辺に繋げる
  else {
    startX = startObj.x + startObj.width + margin;
    endX = endObj.x - margin;
  }
  return { startX, startY, endX, endY };
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
