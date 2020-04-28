import {p5InstanceExtensions, Vector } from "p5";

export function drawArrow(p5 : p5InstanceExtensions, base, end, myColor) {
    p5.push();
    p5.stroke(myColor);
    p5.strokeWeight(3);
    p5.fill(myColor);
    let vec = Vector.sub(end, base);
    p5.translate(base.x, base.y);
    p5.line(0, 0, vec.x, vec.y);
    p5.rotate(vec.heading());
    let arrowSize = 14;
    p5.translate(vec.mag() - arrowSize, 0);
    p5.triangle(0, arrowSize / 3, 0, -arrowSize / 3, arrowSize, 0);
    p5.pop();
  }