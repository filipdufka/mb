import React, { Component } from "react";
import Sketch from "react-p5";
import { p5InstanceExtensions } from 'p5';


export default class MBLogo extends Component {
    orderRatio = 0;
    targetOrderRatio = 0.98;
    bWidth = 200;
    bHeight = 250;

    setup = (p5: p5InstanceExtensions, canvasParentRef) => {
        p5.createCanvas(800, 800).parent(canvasParentRef);
        p5.textSize(40);
        p5.textAlign(p5.CENTER, p5.CENTER);
    };

    draw = (p5: p5InstanceExtensions) => {
        p5.clear();

        let split = 115;
        this.orderRatio = p5.lerp(this.orderRatio, this.targetOrderRatio, 0.005);

        p5.translate(p5.width / 2 + 20, p5.height / 2 - 40);
        p5.translate(-split, 0);
        this.drawM(p5, this.orderRatio);

        p5.resetMatrix();
        p5.translate(p5.width/2 + 20, p5.height/2 - 40);
        p5.translate(split,0);
        this.drawB(p5, this.orderRatio); 

    }

    render() {
        return <Sketch setup={this.setup} draw={this.draw} style={{ position: "absolute" }} />;
    }

    drawM = (p5: p5InstanceExtensions, orderRatio: number) => {
        p5.strokeWeight(2);

        let verticalLines = 17;
        let mWidth = 200;
        let mHeight = 250;
        let base = mHeight / 2;

        for (let i = 0; i < verticalLines; i++) {
            let t = i / (verticalLines - 1);
            let cut = this.mCutout(p5, t);
            let n = p5.noise(t * 4, p5.millis() * 0.005);
            let y = p5.lerp(n, cut, orderRatio);

            let x = p5.map(i, 0, verticalLines - 1, - mWidth / 2, mWidth / 2);
            p5.line(x, base, x, base - mHeight * y);
        }
    }

    mCutout = (p5: p5InstanceExtensions, t: number) => {
        let cleavage = 0.52;
        return p5.map(p5.abs(t - 0.5), 0, 0.5, cleavage, 1);
    }

    drawB = (p5: p5InstanceExtensions, orderRatio: number) => {
        let horizontalLines = 21;
        let base = -this.bWidth / 2;
        for (let i = 0; i < horizontalLines; i++) {
            let t = i / (horizontalLines - 1);

            let n = p5.noise(t * 3, p5.millis() * 0.005);
            let cut = this.cutoutB(p5, t);
            let x = p5.lerp(n, cut, orderRatio);

            let y = p5.map(i, 0, horizontalLines - 1, -this.bHeight / 2, this.bHeight / 2);
            p5.strokeWeight(2);
            p5.line(base, y, base + this.bWidth * x, y);
        }
    }

    cutoutB = (p5: p5InstanceExtensions, t: number) => {

        let circleRatio = 0.45;
        let r1 = 0.5;
        let r2 = 0.6;

        let d1 = this.bHeight * circleRatio;
        let d2 = this.bHeight - d1;
        let x = this.bWidth / 2;

        let t1 = p5.norm(t, 0, circleRatio);
        let t2 = p5.norm(t, circleRatio, 1);
        let r = r1;
        let sinx = 0;
        if (t < circleRatio) {
            sinx = 2 * p5.abs(t1 - 0.5);
        } else {
            sinx = 2 * p5.abs(t2 - 0.5);
            r = r2;
        }

        let cosx = p5.sqrt(1 - p5.pow(sinx, 2));
        return p5.map(r * cosx, 0, 1, 0.55, 1);
    }
}