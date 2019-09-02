class Graph {
    constructor(border) {
      this.data = null;
      this.border = border;
      this.c1 = null;
      this.c2 = null;
      this.ymin = 0;
      this.ymax = 1;
    }
  
    setData(data) {
      this.data = data;
    }

    setYMinMax(ymin, ymax){
      this.ymin = ymin;
      this.ymax = ymax;
    }
  
    show() {  
      for (let i = 1; i < this.data.length; i++) {
        let A = this.getPosition(i-1);
        let B = this.getPosition(i);
        this.drawColor();        
        line(A.x, A.y, B.x, B.y);
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
      let x = map(i, 0, this.data.length, this.border.left, this.border.right);
      let y = map(this.data[i], this.ymin, this.ymax,this.border.bottom, this.border.top);
      return {x: x, y: y};
    }
  }