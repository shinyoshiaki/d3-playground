export function twoPointPos(
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  x: number
) {
  return ((p2.y - p1.y) / (p2.x - p1.x)) * (x - p1.x) + p1.y;
}

export function vectorDist(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
