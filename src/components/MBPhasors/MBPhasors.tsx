import React, { Component } from "react";
import {P5Wrapper} from "../../utils/react-p5-wrapper";
import phasorsSketch from "./phasorSketch";

export const MBPhasors: React.FC<{}> = (props: {}) => {
  return (
      <P5Wrapper sketch={phasorsSketch} />
  );
};

// export default class MBPhasors extends Component {
//   guides: Guides;
//   phasorA : Phasor;
//   phasorB : Phasor;
//   phasorSum : Phasor;  

//   setup = (p5: p5InstanceExtensions, canvasParentRef) => {
//     p5.createCanvas(900, 900).parent(canvasParentRef);
//     this.guides = new Guides(p5);
//     this.guides.addHorizontal(p5.height / 2);
//     this.guides.addVertical(p5.width / 2);

//     let center:Vector = p5.createVector(this.guides.vs[0], this.guides.hs[0]);

//     this.phasorA = new Phasor(p5, p5.createVector(-100, -100), p5.color(20), center);
//     this.phasorB = new Phasor(p5, p5.createVector(200, -100), p5.color("green"),center);
//     this.phasorSum = new Phasor(p5, p5.createVector(0, 0), p5.color("red"),center);
//   };

//   draw = (p5: p5InstanceExtensions) => {
//     p5.clear();
//     let mousePos = p5.createVector(p5.mouseX, p5.mouseY);
//     p5.strokeWeight(1);
//     this.guides.show();

//     this.phasorA.show(mousePos);
//     this.phasorB.show(mousePos);
//     if (Phasor.selectedPhasor != null) {
//       Phasor.selectedPhasor.setMouseDir(mousePos);
//     }
//     this.phasorSum.v = Vector.add(this.phasorA.v, this.phasorB.v);
//     this.phasorSum.show(mousePos);
//   };

//   render() {
//     return (
//       <Sketch
//         setup={this.setup}
//         draw={this.draw}
//         style={{ position: "absolute" }}
//       />
//     );
//   }
// }
