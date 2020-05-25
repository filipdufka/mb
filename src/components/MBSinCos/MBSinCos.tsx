import React, { Component } from "react";
import P5Wrapper from "../../utils/react-p5-wrapper";
import phasorsSketch from "../MBPhasors/phasorSketch";

export const MBSinCos: React.FC<{}> = (props: {}) => {
  return (
      <P5Wrapper sketch={phasorsSketch} />
  );
};


// export default class MBSinCos extends Component {
//   sinGraph: Graph;
//   cosGraph: Graph;
//   guides: Guides;
//   margin: number = 50;
//   graphHeight: number;
//   speed: number = 0.0005;
//   periodsToShow: number = 1.5;
//   setup = (p5: p5InstanceExtensions, canvasParentRef) => {
//     p5.createCanvas(1600, 550).parent(canvasParentRef);

//     this.guides = new Guides(p5);
//     this.graphHeight = (p5.height - 3 * this.margin) / 2;

//     this.guides.addHorizontal(this.margin);
//     this.guides.addHorizontal(this.margin + this.graphHeight);
//     this.guides.addHorizontal(this.margin + this.graphHeight + this.margin);
//     this.guides.addHorizontal(this.margin + this.graphHeight + this.margin + this.graphHeight);

//     this.guides.addVertical(this.margin);
//     this.guides.addVertical(this.margin + this.graphHeight);
//     this.guides.addVertical(this.margin + this.graphHeight + this.margin);
//     this.guides.addVertical(p5.width - this.margin);

//     this.sinGraph = new Graph(
//       p5,
//       new Rectangle(this.guides.vs[2], this.guides.hs[0], this.guides.vs[3], this.guides.hs[1])
//     );
//     this.sinGraph.setYMinMax(-1, 1);
//     this.cosGraph = new Graph(
//       p5,
//       new Rectangle(this.guides.vs[2], this.guides.hs[2], this.guides.vs[3], this.guides.hs[3])
//     );
//     this.cosGraph.setYMinMax(-1, 1);
//   };

//   draw = (p5: p5InstanceExtensions) => {
//     p5.clear();  
//     p5.stroke(200);
//     p5.noFill();
    
//   // Data
//     let t = p5.millis() * this.speed;
//     //t = 0;
//     let dataSin = generateSin(t, this.periodsToShow );
//     let dataCos = generateSin(t + Math.PI/2, this.periodsToShow );
    
//   // Guides
//   this.guides.show();  
  
//   // Graphs
//   this.sinGraph.setData(dataSin);
//   this.sinGraph.show();
    
//   this.cosGraph.setData(dataCos);
//   this.cosGraph.show();
  
//     // Circle
//     p5.circle(this.guides.vs[0] + this.graphHeight/2, this.margin + this.graphHeight/2,this.graphHeight);
  
//     // Points
//     p5.circle(this.guides.vs[2], this.sinGraph.getPosition(0).y , 20);
//     p5.circle(this.guides.vs[2], this.cosGraph.getPosition(0).y , 20);
  
//     // Circle Point
//     let cpx = p5.map(dataCos[0],-1,1,this.guides.vs[0], this.guides.vs[1]);
//     let cpy = this.sinGraph.getPosition(0).y;
//     p5.circle( cpx, cpy, 20);
  
//     // Line Guides
//     var arcR = (this.cosGraph.getPosition(0).y - this.guides.vs[2]) * 2;
//     p5.arc(this.guides.vs[1], this.guides.hs[2], arcR, arcR, Math.PI/2 , Math.PI);  
  
//     // Connect Lines
//     p5.line(cpx, cpy, cpx, this.guides.hs[2]);
//     p5.line( this.guides.vs[1], 
//         this.cosGraph.getPosition(0).y,
//         this.guides.vs[2], 
//         this.cosGraph.getPosition(0).y);
//     p5.line( cpx, 
//           cpy, 
//           this.guides.vs[2], 
//           cpy);
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
