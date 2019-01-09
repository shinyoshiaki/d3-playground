export function twoPointPos(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  x: number
) {
  console.log({ p1, p2, x });
  return ((p2.y - p1.y) / (p2.x - p1.x)) * (x - p1.x) + p1.y;
}
