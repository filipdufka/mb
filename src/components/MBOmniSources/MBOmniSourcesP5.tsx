import React, { Component } from "react";
import Sketch from "react-p5";
import { p5InstanceExtensions } from 'p5';


export default class MBOmniSourcesP5 extends Component<MBOmniSourcesP5Props, {}> {

    setup = (p5: p5InstanceExtensions, canvasParentRef) => {
        p5.createCanvas(800, 800).parent(canvasParentRef);
    };

    draw = (p5: p5InstanceExtensions) => {
        p5.clear();
        p5.background(25,25,25,25);
    }

    render() {
        return <Sketch setup={this.setup} draw={this.draw} style={{ position: "absolute" }} />;
    }
}

interface MBOmniSourcesP5Props {
    res: number[]; 
    blobMoved (positions: number[][]):void;
}