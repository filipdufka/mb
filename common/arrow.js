function drawArrow(base, end, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    let vec = p5.Vector.sub(end, base);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 14;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 3, 0, -arrowSize / 3, arrowSize, 0);
    pop();
  }