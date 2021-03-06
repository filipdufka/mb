import { p5InstanceExtensions, Color } from "p5";

export class Graph {
  data; xdata; xlabels; ylabels; border;c1;c2;
  mainColor : Color;
  ymin;ymax;xmin;xmax;lineWeight; 
  p:p5InstanceExtensions;

    constructor(p : p5InstanceExtensions, border) {
      this.data = null;
      this.xdata = null;
      this.xlabels = null;
      this.ylabels = null;
      this.border = border;
      this.c1 = null;
      this.c2 = null;
      this.mainColor = p.color(0,0,0);
      this.ymin = 0;
      this.ymax = 1;
      this.xmin = 0;
      this.xmax = 1;
      this.lineWeight = 0.5;
      this.p = p;
    }
  
    setData(data) {
      this.data = data;
    }

    setXData(data){
      this.xdata = data;
      this.getXMinMax();
    }

    setXLabels(xlabels){
      this.xlabels = xlabels;
    }

    setYLabels(ylabels){
      this.ylabels = ylabels;
    }

    setYMinMax(ymin, ymax){
      this.ymin = ymin;
      this.ymax = ymax;
    }

    setMainColor(col : Color){
      this.mainColor = col;
    }

    setLineWeight(weight){
      this.lineWeight = weight;
    }
  
    show() {  
      this.lineSetting();
      for (let i = 1; i < this.data.length; i++) {
        let A = this.getPosition(i-1);
        let B = this.getPosition(i);
        let t = this.p.norm(this.data[i-1], this.ymin, this.ymax);
        this.drawColor(t);        
        this.p.line(A.x, A.y, B.x, B.y);
      }
    }

    showLabels(){
      this.showYLabels(4);
      this.showXLabels(8);
    }

    showYLabels(steps){
      let yrange = this.ymax - this.ymin;
      let ystep = yrange/steps;
      if(this.ylabels == null){
        for(let i = 0; i <= steps; i++){
          let yPos = this.p.map(i, 0, steps, this.border.bottom, this.border.top);
          let yValue = this.p.map(i, 0,steps, this.ymin, this.ymax);
          let xPosA = this.border.left;
          let xPosB = this.border.left + 20;
          this.lineSetting();
          this.p.line(xPosA, yPos, xPosB, yPos);
          this.p.noStroke();
          this.p.fill(this.mainColor);
          this.p.text(yValue.toFixed(1), xPosA - 30, yPos + 5);
        }  
      } else{
        for(let i = 0; i < this.ylabels.length; i++){
          let l = this.ylabels[i];
          let yPos = this.p.map(l.y, this.ymin, this.ymax, this.border.bottom, this.border.top);
          let xPos = this.border.left;
          this.lineSetting();
          this.p.line(xPos, yPos, xPos + 20, yPos);
          this.p.noStroke();
          this.p.fill(this.mainColor);
          this.p.textAlign(this.p.RIGHT);
          this.p.text(l.label, xPos - 5 , yPos + 5);
        }
      }
    }

    showXLabels(steps){
      let zeroYpos = this.getZeroYPos();
      this.lineSetting();
      this.p.line(this.border.left, zeroYpos, this.border.right, zeroYpos);
      if(this.xlabels == null){
        for(let i = 0; i <= steps; i++){
          let xPos = this.p.map(i, 0, steps, this.border.left, this.border.right);
          let xValue = this.p.map(i, 0, steps, this.xmin, this.xmax);
          this.lineSetting();
          this.p.line(xPos, zeroYpos + 10, xPos, zeroYpos - 10);
          this.p.textAlign(this.p.CENTER);
          this.p.noStroke();
          this.p.fill(this.mainColor);
          this.p.text(xValue.toFixed(2), xPos, zeroYpos + 25);
        }
      }else{
        for(let i = 0; i < this.xlabels.length; i++){
          let l = this.xlabels[i];
          let xPos = this.p.map(l.x, this.xmin, this.xmax, this.border.left, this.border.right);
          this.lineSetting();
          this.p.line(xPos, zeroYpos + 10,xPos, zeroYpos - 10);
          this.p.textAlign(this.p.CENTER);
          this.p.noStroke();
          this.p.fill(this.mainColor);
          this.p.text(l.label, xPos, zeroYpos + 25);
        }
      }
    }


    getZeroYPos(){
      let zeroYPos = this.border.bottom;
      if(Math.sign(this.ymax) != Math.sign(this.ymin)){
        zeroYPos = this.p.map(0, this.ymin, this.ymax, this.border.bottom, this.border.top);        
      }else if(this.ymax < 0){
        zeroYPos = this.border.top;
      }
      return zeroYPos;
    }

    getXMinMax(){
      if(this.xdata != null){
        if(this.xdata.length > 0){
          this.xmin = this.xdata[0];
          this.xmax = this.xdata[this.xdata.length-1];          
        }
      }
    }

    drawColor(t){
      if(this.c1 != null && this.c2 != null){
        this.p.stroke(this.p.lerpColor(this.c1,this.c2,t));
      }
    }

    setColorLerp(c1, c2){
      this.c1 = c1;
      this.c2 = c2;
    }

    getPosition(i){
      let p = this.p;
      let x = p.map(i, 0, this.data.length - 1, this.border.left, this.border.right);
      let y = p.map(this.data[i], this.ymin, this.ymax,this.border.bottom, this.border.top);
      return {x: x, y: y};
    }

    getValue(i){
      return this.data[i];
    }

    lineSetting(){
      var p = this.p;
      p.stroke(this.mainColor);
      p.noFill();
      p.strokeWeight((this.lineWeight));
    }
  }