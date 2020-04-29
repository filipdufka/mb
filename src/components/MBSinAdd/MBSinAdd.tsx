import React, { Component } from "react";
import Sketch from "react-p5";
import { p5InstanceExtensions } from "p5";
import { Guides } from "../../utils/guides";
import { Graph } from "../../utils/graph";
import { Slider } from "../../utils/slider";
import { Checkbox } from "../../utils/checkbox";
import { Rectangle } from "../../utils/rectangle";
import { generateSin } from "../../utils/signal_generator";

export default class MBSinAdd extends Component {
  graphA: Graph;
  graphB: Graph;
  graphSum: Graph;
  guides: Guides;
  phase: number = 0;
  decibels;
  obstacle: boolean;
  phaseSlider: Slider;
  periodsSlider: Slider;
  testSlider: Slider;
  degreesCheckbox: Checkbox;
  decibelsCheckbox: Checkbox;
  animationCheckbox: Checkbox;
  obstacleCheckbox: Checkbox;

  setup = (p5: p5InstanceExtensions, canvasParentRef) => {
    p5.createCanvas(800, 550).parent(canvasParentRef);

    let rect = new Rectangle(50, 50, p5.width - 50, p5.height - 50);
    this.graphA = new Graph(p5, rect);
    this.graphA.setYMinMax(-2, 2);
    this.graphA.setMainColor(p5.color(255, 0, 0));
    this.graphB = new Graph(p5, rect);
    this.graphB.setYMinMax(-2, 2);
    this.graphB.setMainColor(p5.color(0, 0, 255));
    this.graphSum = new Graph(p5, rect);
    this.graphSum.setYMinMax(-2, 2);
    this.createSliders(p5);
    this.createCheckBoxes(p5);
  };

  draw = (p5: p5InstanceExtensions) => {
    p5.clear();

    p5.stroke(0, 0, 0, 25);
    if (this.animationCheckbox.getValue()) {
      this.phase += 0.01;
    }

    let resolution = 300;

    let dataA = generateSin(
      this.phase,
      this.periodsSlider.getValue(),
      resolution
    );
    let dataB = generateSin(
      this.phaseSlider.getValue() + this.phase,
      this.periodsSlider.getValue(),
      resolution
    );

    if (this.obstacleCheckbox.getValue()) {
      let dataStandingWave = generateSin(
        this.phaseSlider.getValue() + this.phase,
        this.periodsSlider.getValue() * 2,
        resolution * 2
      );
      dataA = dataStandingWave.slice(0, resolution);
      dataB = dataStandingWave.slice(resolution).reverse();
      p5.strokeWeight(8);
      p5.line(
        this.graphSum.border.right,
        this.graphSum.border.top,
        this.graphSum.border.right,
        this.graphSum.border.bottom
      );
    }

    this.graphA.setData(dataA);
    this.graphA.show();

    this.graphB.setData(dataB);
    this.graphB.show();

    //SUM
    let dataSum = [];
    let xdataSum = [];
    for (let i = 0; i < dataA.length; i++) {
      dataSum[i] = dataA[i] + dataB[i];
      xdataSum[i] = p5.map(
        i,
        0,
        dataA.length - 1,
        0,
        this.periodsSlider.getValue() * 2 * Math.PI
      );
    }

    let xlabels = this.createXLabels();
    let ylabels = this.createYLabels();

    this.graphSum.setData(dataSum);
    this.graphSum.setXData(xdataSum);
    this.graphSum.setXLabels(xlabels);
    this.graphSum.setYLabels(ylabels);

    this.graphSum.show();
    this.graphSum.showLabels();

    this.phaseSlider.show();
    this.periodsSlider.show();

    this.degreesCheckbox.show();
    this.decibelsCheckbox.show();
    this.animationCheckbox.show();
    this.obstacleCheckbox.show();
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

  createSliders = (p5:p5InstanceExtensions) => {
    this.phaseSlider = new Slider(p5, 0, 2 * p5.PI);
    this.phaseSlider.setRectangle(new Rectangle(100, 15, 180, 35));
    this.phaseSlider.setLabel("Phase: ");

    this.periodsSlider = new Slider(p5, 1, 3);
    this.periodsSlider.setRectangle(new Rectangle(250, 15, 330, 35));
    this.periodsSlider.setLabel("Periods: ");
  };

  createCheckBoxes = (p5:p5InstanceExtensions) => {
    this.degreesCheckbox = new Checkbox(p5);
    this.degreesCheckbox.setRectangle(new Rectangle(358, 16, 372, 30));
    this.degreesCheckbox.setLabel("Degrees");

    this.decibelsCheckbox = new Checkbox(p5);
    this.decibelsCheckbox.setRectangle(new Rectangle(458, 16, 472, 30));
    this.decibelsCheckbox.setLabel("Decibels");

    this.animationCheckbox = new Checkbox(p5);
    this.animationCheckbox.setRectangle(new Rectangle(558, 16, 572, 30));
    this.animationCheckbox.setLabel("Animation");

    this.obstacleCheckbox = new Checkbox(p5);
    this.obstacleCheckbox.setRectangle(new Rectangle(658, 16, 672, 30));
    this.obstacleCheckbox.setLabel("Obstacle");
  };

  createXLabels = () => {
    let xlabels = [];
    let pis = this.periodsSlider.getValue() * 2;
    for (let i = 0; i <= pis; i++) {
      if (this.degreesCheckbox.getValue()) {
        xlabels[i] = { x: i * Math.PI, label: 180 * i + "°" };
      } else {
        let label;
        if (i === 0) {
          label = "0";
        } else if (i === 1) {
          label = "π";
        } else {
          label = i + "π";
        }
        xlabels[i] = { x: i * Math.PI, label: label };
      }
    }
    return xlabels;
  };

  createYLabels = () => {
    let ylabels = [];
    if (this.decibelsCheckbox.getValue()) {
      ylabels[0] = { y: 2, label: "6 dB" };
      ylabels[1] = { y: 1, label: "0 dB" };
      ylabels[2] = { y: 0, label: "-oo dB" };
      ylabels[3] = { y: -1, label: "0" };
      ylabels[4] = { y: -2, label: "6 dB" };
    } else {
      ylabels[0] = { y: 2, label: "2" };
      ylabels[1] = { y: 1, label: "1" };
      ylabels[2] = { y: 0, label: "0" };
      ylabels[3] = { y: -1, label: "-1" };
      ylabels[4] = { y: -2, label: "-2" };
    }
    return ylabels;
  };
}
