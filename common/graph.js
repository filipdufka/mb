class Graph {
    constructor(border) {
      this.data = null;
      this.border = border;
      this.c1 = null;
      this.c2 = null;
    }
  
    setData(data) {
      this.data = data;
    }
  
    show() {  
      for (let i = 1; i < this.data.length; i++) {
        let x1 = map(i - 1, 0, this.data.length, this.border.left, this.border.right);
        let x2 = map(i, 0, this.data.length, this.border.left, this.border.right);
        let y1 = map(this.data[i - 1], 1, 0, this.border.top, this.border.bottom);
        let y2 = map(this.data[i], 1, 0,this.border.top, this.border.bottom);
        
        this.drawColor();        
        line(x1, y1, x2, y2);
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
  }