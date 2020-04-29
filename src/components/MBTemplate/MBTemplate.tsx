import React, { Component } from "react";
import Sketch from "react-p5";
import { p5InstanceExtensions } from 'p5';


export default class MBTemplate extends Component {

    setup = (p5: p5InstanceExtensions, canvasParentRef) => {
        p5.createCanvas(800, 800).parent(canvasParentRef);
    };

    draw = (p5: p5InstanceExtensions) => {
        p5.clear();
    }

    render() {
        return <Sketch setup={this.setup} draw={this.draw} style={{ position: "absolute" }} />;
    }
}