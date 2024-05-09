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

function between(target: number, min: number, max: number) {
  return target >= min && target <= max;
}
