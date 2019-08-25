class Graph {
    constructor(border) {
      this.data = null;
      this.border = border;
    }
  
    setData(data) {
      this.data = data;
    }
  
    show() {  
      for (let i = 1; i < this.data.length; i++) {
        let x1 = map(i - 1, 0, dataSin.length, this.border.left, this.border.right);
        let x2 = map(i, 0, dataSin.length, this.border.left, this.border.right);
        let y1 = map(this.data[i - 1], 0, 1,this.border.top, this.border.bottom);
        let y2 = map(this.data[i], 0, 1,this.border.top, this.border.bottom);
        line(x1, y1, x2, y2);
      }
    }
  }