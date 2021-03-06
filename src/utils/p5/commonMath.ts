import { p5InstanceExtensions, Vector } from 'p5';

export function sqr(x) { return x * x }
export function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
export function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x),
                    y: v.y + t * (w.y - v.y) });
}
export function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }

//from https://stackoverflow.com/questions/12219802/a-javascript-function-that-returns-the-x-y-points-of-intersection-between-two-ci
export function circlesIntersection(p5 : p5InstanceExtensions, x0: number, y0:number, r0:number, x1:number, y1:number, r1:number) {
  var a, dx, dy, d, h, rx, ry;
  var x2, y2;

  /* dx and dy are the vertical and horizontal distances between
    * the circle centers.
    */
  dx = x1 - x0;
  dy = y1 - y0;

  /* Determine the straight-line distance between the centers. */
  d = Math.sqrt((dy*dy) + (dx*dx));

  /* Check for solvability. */
  if (d > (r0 + r1)) {
      /* no solution. circles do not intersect. */
      return false;
  }
  if (d < Math.abs(r0 - r1)) {
      /* no solution. one circle is contained in the other */
      return false;
  }

  /* 'point 2' is the point where the line through the circle
    * intersection points crosses the line between the circle
    * centers.  
    */

  /* Determine the distance from point 0 to point 2. */
  a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;

  /* Determine the coordinates of point 2. */
  x2 = x0 + (dx * a/d);
  y2 = y0 + (dy * a/d);

  /* Determine the distance from point 2 to either of the
    * intersection points.
    */
  h = Math.sqrt((r0*r0) - (a*a));

  /* Now determine the offsets of the intersection points from
    * point 2.
    */
  rx = -dy * (h/d);
  ry = dx * (h/d);

  /* Determine the absolute intersection points. */
  var xi = x2 + rx;
  var xi_prime = x2 - rx;
  var yi = y2 + ry;
  var yi_prime = y2 - ry;

  return [p5.createVector(xi,yi), p5.createVector(xi_prime, yi_prime)];
}

export function getNormal(p5 : p5InstanceExtensions, pos0, pos1){
  let dir = Vector.sub(pos1, pos0).normalize();
  return p5.createVector(dir.y,-dir.x);
}

export function lerp(A:number, B:number, t:number):number{
  return A + (B - A) * t;
}

export function vectorLerp(A:Vector, B:Vector, t:number):Vector{
  let v = new Vector();
  v.x = lerp(A.x, B.x, t);
  v.y = lerp(A.y, B.y, t);
  return v;
}