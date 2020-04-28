import { p5InstanceExtensions, Vector, Color } from "p5";
import { drawArrow } from "./arrow";
import { distToSegment } from "./commonMath";

export class Phasor {
  v: Vector;
  col : Color;
  center: Vector;
  hover : boolean;
  p: p5InstanceExtensions;
  static selectedPhasor: Phasor;
  constructor(p5: p5InstanceExtensions, v : Vector, col : Color, center: Vector) {
    this.v = v;
    this.col = col;
    this.center = center;
    this.hover = false;
    this.p = p5;
  }

  show(mousePos: Vector) {
    this.getHover(mousePos);

    drawArrow(
      this.p,
      this.center,
      this.getEnd(),
      this.hover ? this.p.color(125, 200, 255) : this.col
    );
  }

  getEnd() {
    return Vector.add(this.center, this.v);
  }

  setMouseDir(mousePos: Vector) {
    this.v = Vector.sub(mousePos, this.center);
    if (this.v.mag() < 30) {
      this.v.setMag(30);
    }
  }

  getHover(mousePos: Vector) {
    let dist = distToSegment(mousePos, this.center, this.getEnd());

    if (dist < 5 && this.hover == false && Phasor.selectedPhasor == null) {
      this.hover = true;
      if (this.p.mouseIsPressed) {
        Phasor.selectedPhasor = this;
      }
    } else {
      this.hover = false;
    }
    if (this.p.mouseIsPressed == false) {
      Phasor.selectedPhasor = null;
    }
  }
}
