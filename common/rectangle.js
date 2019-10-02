class Rectangle{
    constructor(left, top, right, bottom){
      this.left = left;
      this.right = right;
      this.top = top;
      this.bottom = bottom;
    }

    getWidth(){
      return this.right - this.left;
    }
    
    getHeight(){
      return this.bottom - this.top;
    }
  }