import React, { Component } from "react";
import Sketch from "react-p5";
import { p5InstanceExtensions, Vector } from "p5";

export default class MBSpaceWave extends Component {
  points: Vector[];
  setup = (p5: p5InstanceExtensions, canvasParentRef) => {
    p5.createCanvas(800, 600).parent(canvasParentRef);
    this.points = [];
    for (let i = 0; i < 200; i++) {
      this.points[i] = p5.createVector(
        p5.random(p5.width),
        p5.random(p5.height)
      );
    }
  };

  draw = (p5: p5InstanceExtensions) => {
    p5.clear();
    p5.noStroke();

    let c2 = p5.color(20, 125, 255);
    let c1 = p5.color(255, 80, 20);

    for (let i = 0; i < this.points.length; i++) {
      let point = this.points[i];
      let sinX = p5.sin((p5.millis() * 0.1 - point.x) * 0.05);
      let cosX = p5.cos((p5.millis() * 0.1 - point.x) * 0.05);
      p5.fill(p5.lerpColor(c2, c1, p5.map(cosX, -1, 1, 0, 1)));
      p5.circle(point.x + sinX * 10, point.y, 5);
    }

    p5.strokeWeight(3);
    for (let i = 1; i < p5.width; i++) {
      let y1 = -p5.cos((p5.millis() * 0.1 - i - 1) * 0.05);
      let y2 = -p5.cos((p5.millis() * 0.1 - i) * 0.05);

      p5.stroke(p5.lerpColor(c1, c2, p5.map(y2, -1, 1, 0, 1)));
      y1 *= 20;
      y2 *= 20;
      y1 += 70;
      y2 += 70;
      p5.line(i - 1, y1, i, y2);
    }
  };

  render() {
    return (
      <Sketch
        setup={this.setup}
        draw={this.draw}
        style={{ position: "absolute" }}
      />
    );
  }
}
