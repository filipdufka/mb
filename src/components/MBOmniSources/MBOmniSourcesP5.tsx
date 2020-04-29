import React, { Component } from "react";
import Sketch from "react-p5";
import { p5InstanceExtensions, Vector } from 'p5';
import { DraggablePoint } from "../../utils2/draggablePoint";


export default class MBOmniSourcesP5 extends Component<MBOmniSourcesP5Props, {}> {
    omniSourcePositions : DraggablePoint[] = [];

    setup = (p5: p5InstanceExtensions, canvasParentRef) => {
        p5.createCanvas(800, 800).parent(canvasParentRef);

        this.omniSourcePositions.push(new DraggablePoint(p5.createVector(350.0, 400.0)));
        this.omniSourcePositions.push(new DraggablePoint(p5.createVector(450.0, 400.0)));
        this.omniSourcePositions.push(new DraggablePoint(p5.createVector(400.0, 800.0)));
        this.omniSourcePositions.push(new DraggablePoint(p5.createVector(450.0, 800.0)));
        this.omniSourcePositions.push(new DraggablePoint(p5.createVector(500.0, 800.0)));
    };

    draw = (p5: p5InstanceExtensions) => {
        p5.clear();
        p5.stroke(120,50,255);  
    
        for (let s = 0; s < this.omniSourcePositions.length; s++) {
          const element = this.omniSourcePositions[s];
          if(s < this.props.numOfOmniSources){
            this.omniSourcePositions[s].pos.x = Math.abs(this.omniSourcePositions[s].pos.x); 
            element.show(p5);
          }else{
            this.omniSourcePositions[s].pos.x = -Math.abs(this.omniSourcePositions[s].pos.x); 
          }
        }
        let positions : Vector[] = [];
        this.omniSourcePositions.map((os) => {positions.push(os.pos);});
        this.props.blobMoved(positions);
    }

    render() {
        return <Sketch setup={this.setup} draw={this.draw} style={{ position: "absolute" }} />;
    }
}

interface MBOmniSourcesP5Props {
    res: number[]; 
    numOfOmniSources: number;
    blobMoved (positions: Vector[]):void;
}