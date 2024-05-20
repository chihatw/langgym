import { Box } from '../class/Box';

export function checkIsMouseOver(
  pos: { x: number; y: number },
  x: number,
  y: number,
  width: number,
  height: number
) {
  const isBetween_x = between(pos.x, x, x + width);
  const isBetween_y = between(pos.y, y, y + height);

  return isBetween_x && isBetween_y;
}

export function boxCollision(
  box1: Pick<Box, 'x' | 'y' | 'right' | 'bottom'>,
  box2: Pick<Box, 'x' | 'y' | 'right' | 'bottom'>
) {
  // box1 の左上角でチェック
  if (
    between(box1.x, box2.x, box2.right) &&
    between(box1.y, box2.y, box2.bottom)
  )
    return true;

  // box2 の右下角でチェック
  if (
    between(box1.right, box2.x, box2.right) &&
    between(box1.bottom, box2.y, box2.bottom)
  )
    return true;

  return false;
}

function between(target: number, min: number, max: number) {
  return target >= min && target <= max;
}
