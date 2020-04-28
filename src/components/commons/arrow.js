function drawArrow(p, base, end, myColor) {
    p.push();
    p.stroke(myColor);
    p.strokeWeight(3);
    p.fill(myColor);
    let vec = p5.Vector.sub(end, base);
    p.translate(base.x, base.y);
    p.line(0, 0, vec.x, vec.y);
    p.rotate(vec.heading());
    let arrowSize = 14;
    p.translate(vec.mag() - arrowSize, 0);
    p.triangle(0, arrowSize / 3, 0, -arrowSize / 3, arrowSize, 0);
    p.pop();
  }