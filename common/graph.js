class Graph {
    constructor(border) {
      this.data = null;
      this.xdata = null;
      this.border = border;
      this.c1 = null;
      this.c2 = null;
      this.ymin = 0;
      this.ymax = 1;
      this.xmin = 0;
      this.xmax = 1;
    }
  
    setData(data) {
      this.data = data;
    }

    setXdata(data){
      this.xdata = data;
      this.getXMinMax();
    }

    setYMinMax(ymin, ymax){
      this.ymin = ymin;
      this.ymax = ymax;
    }
  
    show() {  
      for (let i = 1; i < this.data.length; i++) {
        let A = this.getPosition(i-1);
        let B = this.getPosition(i);
        let t = norm(this.data[i-1], this.ymin, this.ymax);
        this.drawColor(t);        
        line(A.x, A.y, B.x, B.y);
      }
    }

    showLabels(){
      this.showYLabels(4);
      this.showXLabels(8);
    }

    showYLabels(steps){
      let yrange = this.ymax - this.ymin;
      let ystep = yrange/steps;

      for(let i = 0; i <= steps; i++){
        let yPos = map(i, 0, steps, this.border.bottom, this.border.top);
        let yValue = map(i, 0,steps, this.ymin, this.ymax);
        let xPosA = this.border.left;
        let xPosB = this.border.left + 20;
        line(xPosA, yPos, xPosB, yPos);
        text(yValue.toFixed(1), xPosA - 30, yPos + 5);
      }
    }

    showXLabels(steps){
      let zeroYpos = this.border.bottom;
      if(this.ymax >= 0 && this.ymin <= 0){
        zeroYpos = map(0, this.ymin, this.ymax, this.border.bottom, this.border.top);        
      }
      line(this.border.left, zeroYpos, this.border.right, zeroYpos);

      for(let i = 0; i <= steps; i++){
        let xPos = map(i, 0, steps, this.border.left, this.border.right);
        line(xPos, zeroYpos + 10, xPos, zeroYpos - 10);
      }
    }

    getXMinMax(){
      if(this.xdata != null){
        if(this.xdata.length > 0){
          this.xmin = this.xdata[0];
          this.xmax = this.xdata[this.xdata.length];
        }
      }
    }

    drawColor(t){
      if(this.c1 != null && this.c2 != null){
        stroke(lerpColor(this.c1,this.c2,t));
      }
    }

    setColorLerp(c1, c2){
      this.c1 = c1;
      this.c2 = c2;
    }

    getPosition(i){
      let x = map(i, 0, this.data.length - 1, this.border.left, this.border.right);
      let y = map(this.data[i], this.ymin, this.ymax,this.border.bottom, this.border.top);
      return {x: x, y: y};
    }
  }