import React, { Component } from "react";
import Sketch from "react-p5";
import { p5InstanceExtensions, Vector } from "p5";
import { Guides } from "../../utils/guides";
import { BezierCurve } from "../../utils/bezier";
import { Slider } from "../../utils/slider";
import { Checkbox } from "../../utils/checkbox";
import { Rectangle } from "../../utils/rectangle";

export default class MBWrappingPhase extends Component {
render(){
  return (
    <div>
      <input type="range" min="1" max="100" value="50" className="slider" id="myRange"></input>
      <MBWrappingPhaseSketch />
    </div>
  );
}

}

class MBWrappingPhaseSketch extends Component {
  gs : Guides;
  bezier : BezierCurve;
  margin;
  minWraps : number;
  maxWraps : number;
  unwrapTime;

  maxWrapsSlider : Slider;
  unwrapCheckbox : Checkbox;

  setup = (p5: p5InstanceExtensions, canvasParentRef) => {
    p5.createCanvas(1000, 800).parent(canvasParentRef);
    this.createUI(p5);

    this.calculateWraps();
    this.margin = 30;
    this.unwrapTime = 1;

    this.gs = new Guides(p5);
    this.gs.addHorizontal(this.margin);
    this.gs.addHorizontal(p5.height - this.margin);
    this.gs.addVertical(this.margin);
    this.gs.addVertical(p5.width - this.margin);

    this.bezier = new BezierCurve();
    this.bezier.createNewPoint(p5.createVector(this.gs.vs[0], (this.gs.hs[0] + this.gs.hs[1])/2));
    this.bezier.createNewPoint(
      p5.createVector(this.gs.vs[this.gs.vs.length - 1] - 20, this.gs.hs[0])
    );
    this.bezier.createNewPoint(
        p5.createVector(this.gs.vs[this.gs.vs.length - 1], this.gs.hs[0] + 20)
    );
    this.bezier.createNewPoint(
        p5.createVector(this.gs.vs[this.gs.vs.length - 1], this.gs.hs[this.gs.hs.length - 1])
    );

    this.bezier.getSegmentPoint(0, 0).interactable = false;
  };

  draw = (p5: p5InstanceExtensions) => {
    // lock X axis to anchor points
    this.bezier.getSegmentPoint(0, 3).pos.x = this.gs.vs[this.gs.vs.length - 1];

    // calculating max wraps
    this.calculateWraps();
    p5.clear();

    p5.strokeWeight(1);
    p5.stroke(220);
    // border guides
    this.gs.show();

    // wrap guides
    for (let i = this.minWraps; i < this.maxWraps; i++) {
      let hGuide = p5.createVector(0, i * 2 * Math.PI);
      hGuide = this.getCanvasPos(p5, hGuide);
      p5.line(this.gs.vs[0], hGuide.y, this.gs.vs[this.gs.vs.length - 1], hGuide.y);
    }

    p5.stroke(70);
    let bezierDrawPoints = this.bezier.getDrawPoints();
    let bezierAnchorPoints = this.bezier.getAnchorPoints();

    // Unwrapped
    for (let i = 1; i < bezierDrawPoints.length; i++) {
      let A = bezierDrawPoints[i - 1];
      let B = bezierDrawPoints[i];
      p5.line(A.x, A.y, B.x, B.y);
    }

    p5.stroke(230, 125, 45);
    let lineSeq = this.splitSequence(p5, bezierDrawPoints);
    for (let i = 0; i < lineSeq.length; i++) {
      let A = lineSeq[i].A;
      let B = lineSeq[i].B;
      let wrap = lineSeq[i].wrap - Math.floor(this.maxWraps / 2);

      let unwrapTarget = wrap * this.getWrapHeight();

      A.y += unwrapTarget * this.unwrapTime;
      B.y += unwrapTarget * this.unwrapTime;

      p5.line(A.x, A.y, B.x, B.y);
    }

    p5.stroke(30);
    for (let i = 0; i < bezierAnchorPoints.length; i++) {
      bezierAnchorPoints[i].show(p5);
    }

    this.showUI(p5);
    let targetTime = this.unwrapCheckbox.value ? 1 : 0;
    this.unwrapTime = p5.lerp(this.unwrapTime, targetTime, 0.05);
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

  calculateWraps = () => {
    this.maxWraps = this.maxWrapsSlider.getValue();
    this.minWraps = -this.maxWraps;
  };

  getWrapHeight = () => {
    return (this.gs.hs[this.gs.hs.length - 1] - this.gs.hs[0]) / this.maxWraps;
  };

  splitSequence = (p5:p5InstanceExtensions ,seq : Vector[]) => {
    let lineSeq = [];
    for (let i = 1; i < seq.length; i++) {
      let A = p5.createVector(seq[i - 1].x, seq[i - 1].y);
      let B = p5.createVector(seq[i].x, seq[i].y);

      let tA = this.getPlotPos(p5, A);
      let tB = this.getPlotPos(p5, B);

      let wrapA = Math.floor(tA.y / (2 * Math.PI));
      let wrapB = Math.floor(tB.y / (2 * Math.PI));

      if (wrapA == wrapB) {
        let thisLine = { A: A, B: B, wrap: wrapA };
        lineSeq.push(thisLine);
      } else {
        let maxPoint = Math.max(tA.y, tB.y);
        let wrapMax = Math.floor(maxPoint / (2 * Math.PI));
        let angleIntersect = 2 * Math.PI * wrapMax;
        let plotIntersectY = p5.map(angleIntersect, tA.y, tB.y, A.y, B.y);
        let plotIntersectX = p5.map(angleIntersect, tA.y, tB.y, A.x, B.x);

        let newB = p5.createVector(plotIntersectX, plotIntersectY);
        let lineA = { A: A, B: newB, wrap: wrapA };
        lineSeq.push(lineA);

        let newA = p5.createVector(plotIntersectX, plotIntersectY);
        let lineB = { A: newA, B: B, wrap: wrapB };
        lineSeq.push(lineB);
      }
    }
    return lineSeq;
  };

  getPlotPos = (p5:p5InstanceExtensions, canvasPos:Vector) => {
    let plotY = p5.map(
      canvasPos.y,
      this.gs.hs[this.gs.hs.length - 1],
      this.gs.hs[0],
      0,
      this.maxWraps * 2 * Math.PI
    );
    return p5.createVector(canvasPos.x, plotY);
  };

  getCanvasPos = (p5:p5InstanceExtensions, plotPos:Vector) => {
    let canvasY = p5.map(
      plotPos.y,
      0,
      this.maxWraps * 2 * Math.PI,
      this.gs.hs[this.gs.hs.length - 1],
      this.gs.hs[0]
    );
    return p5.createVector(plotPos.x, canvasY);
  };

  createUI = (p5 : p5InstanceExtensions) => {
    this.maxWrapsSlider = new Slider(p5, 3, 17, 2);
    this.maxWrapsSlider.setRectangle(new Rectangle(200, 15, 280, 35));
    this.maxWrapsSlider.setLabel("Max Wraps: ");
    this.maxWrapsSlider.setValue(7);

    this.unwrapCheckbox = new Checkbox(p5);
    this.unwrapCheckbox.setRectangle(new Rectangle(358, 16, 372, 30));
    this.unwrapCheckbox.setLabel("Unwrap: ");
  };

  showUI = (p5 : p5InstanceExtensions) => {
    this.maxWrapsSlider.show();
    this.unwrapCheckbox.show();
  };
}
