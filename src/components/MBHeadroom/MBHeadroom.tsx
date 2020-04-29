import React, { Component } from "react";
import Sketch from "react-p5";
import { p5InstanceExtensions } from "p5";
import { Rectangle } from "../../utils2/rectangle";
import { Graph } from "../../utils2/graph";
import { Slider } from "../../utils2/slider";
import { Checkbox } from "../../utils2/checkbox";
import { generateNoise } from "../../utils2/signal_generator";

export default class MBHeadroom extends Component {
  graphA: Graph;
  graphEdited: Graph;
  periodsSlider : Slider;
  volumeSlider : Slider;
  animationCheckbox : Checkbox;
  squaredCheckbox : Checkbox;
  meanCheckbox : Checkbox;
  rootCheckbox : Checkbox;
  phase : number = 0.0;
  squareAnimationTime : number = 0.0;
  meanAnimationTime : number = 0.0;
  rootAnimationTime : number = 0.0;

  setup = (p5: p5InstanceExtensions, canvasParentRef: Element) => {
    p5.createCanvas(800, 550).parent(canvasParentRef);

    let rect = new Rectangle(70, 50, p5.width - 50, p5.height - 50);

    let Ymax = 1;
    let Ymin = -Ymax;

    this.graphA = new Graph(p5, rect);
    this.graphA.setYMinMax(Ymin, Ymax);
    this.graphA.setMainColor(p5.color(0, 0, 0));

    this.graphEdited = new Graph(p5, rect);
    this.graphEdited.setYMinMax(Ymin, Ymax);
    this.graphEdited.setMainColor(p5.color(255, 0, 0));

    this.createSliders(p5);
    this.createCheckBoxes(p5);
  };

  draw = (p5: p5InstanceExtensions) => {
    p5.clear();

    p5.stroke(0, 0, 0, 25);
    if (this.animationCheckbox.getValue()) {
      this.phase += 0.01;
    }

    // get operation
    let squareTarget = this.squaredCheckbox.getValue() ? 1 : 0;
    let meanTarget = this.meanCheckbox.getValue() ? 1 : 0;
    let rootTarget = this.rootCheckbox.getValue() ? 1 : 0;

    this.squareAnimationTime = p5.lerp(this.squareAnimationTime, squareTarget, 0.05);
    this.meanAnimationTime = p5.lerp(this.meanAnimationTime, meanTarget, 0.05);
    this.rootAnimationTime = p5.lerp(this.rootAnimationTime, rootTarget, 0.05);

    let resolution = 300;

    let dataA = generateNoise(
      p5,
      this.phase,
      this.periodsSlider.getValue(),
      resolution,
      this.volumeSlider.getValue()
    );
    let dataAedited = [];
    let editedSum = 0;
    let maxValuePos = 0;
    for (let i = 0; i < dataA.length; i++) {
      let squared = dataA[i] * dataA[i];
      squared = p5.lerp(dataA[i], squared, this.squareAnimationTime);
      editedSum += squared;
      dataAedited[i] = squared;
      maxValuePos =
        Math.abs(dataA[i]) > Math.abs(dataA[maxValuePos]) ? i : maxValuePos;
    }

    let mean = editedSum / dataA.length;
    for (let i = 0; i < dataAedited.length; i++) {
      let meaned = p5.lerp(dataAedited[i], mean, this.meanAnimationTime);
      let root = this.rootAnimationTime > 0.0005 ? Math.sqrt(meaned) : meaned;
      let rooted = p5.lerp(meaned, root, this.rootAnimationTime);
      dataAedited[i] = rooted;
    }

    this.graphA.setData(dataA);
    this.graphEdited.setData(dataAedited);

    let xdataA = [];
    for (let i = 0; i < dataA.length; i++) {
      xdataA[i] = p5.map(
        i,
        0,
        dataA.length - 1,
        0,
        this.periodsSlider.getValue() * 2 * Math.PI
      );
    }

    let xlabels = this.createXLabels();
    let ylabels = this.createYLabels();

    this.graphA.setXData(xdataA);
    this.graphA.setXLabels(xlabels);
    this.graphA.setYLabels(ylabels);

    this.graphA.show();
    this.graphEdited.show();
    this.graphA.showLabels();

    p5.stroke(0);
    p5.line(
      this.graphEdited.getPosition(0).x - 20,
      this.graphEdited.getPosition(0).y,
      this.graphEdited.getPosition(0).x - 5,
      this.graphEdited.getPosition(0).y
    );
    p5.line(
        this.graphA.border.left,
        this.graphA.getPosition(maxValuePos).y,
        this.graphA.border.right,
        this.graphA.getPosition(maxValuePos).y
    );
    p5.noStroke();
    p5.fill(0);
    let rmsValue = 20 * Math.log10(Math.abs(this.graphEdited.getValue(0)));
    p5.text(
      rmsValue.toFixed(2) + " dBFS",
      this.graphEdited.getPosition(0).x,
      this.graphEdited.getPosition(0).y - 5
    );

    let peakValue = 20 * Math.log10(Math.abs(this.graphA.getValue(maxValuePos)));
    p5.text(
      peakValue.toFixed(2) + " dBFS",
      this.graphEdited.getPosition(0).x,
      this.graphA.getPosition(maxValuePos).y - 5
    );

    //GUI
    this.periodsSlider.show();
    this.volumeSlider.show();

    this.animationCheckbox.show();
    this.squaredCheckbox.show();
    this.meanCheckbox.show();
    this.rootCheckbox.show();
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

  createSliders = (p5 : p5InstanceExtensions) => {
    this.periodsSlider = new Slider(p5, 1, 3, 1);
    this.periodsSlider.setRectangle(new Rectangle(150, 15, 230, 35));
    this.periodsSlider.setLabel("Zoom: ");

    this.volumeSlider = new Slider(p5, 0.5, 2);
    this.volumeSlider.setRectangle(new Rectangle(300, 15, 380, 35));
    this.volumeSlider.setLabel("Volume: ");
    this.volumeSlider.setValue(1);
  };

  createCheckBoxes = (p5 : p5InstanceExtensions) => {
    this.animationCheckbox = new Checkbox(p5);
    this.animationCheckbox.setRectangle(new Rectangle(400, 16, 414, 30));
    this.animationCheckbox.setLabel("Animation");

    this.squaredCheckbox = new Checkbox(p5);
    this.squaredCheckbox.setRectangle(new Rectangle(500, 16, 514, 30));
    this.squaredCheckbox.setLabel("Square");

    this.meanCheckbox = new Checkbox(p5);
    this.meanCheckbox.setRectangle(new Rectangle(600, 16, 614, 30));
    this.meanCheckbox.setLabel("Mean");

    this.rootCheckbox = new Checkbox(p5);
    this.rootCheckbox.setRectangle(new Rectangle(700, 16, 714, 30));
    this.rootCheckbox.setLabel("Root");
  };

  createXLabels = () => {
    let xlabels = [];
    return xlabels;
  };

  createYLabels = () => {
    let ylabels = [];
    ylabels[0] = { y: 1, label: "0 dBFS" };
    ylabels[1] = { y: 0, label: "-oo dBFS" };
    ylabels[2] = { y: -1, label: "0 dBFS" };
    return ylabels;
  };
}
