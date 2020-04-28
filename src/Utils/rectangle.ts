export class Rectangle{
  left:number; 
  right:number; 
  top:number; 
  bottom:number;

    constructor(left:number, top:number, right:number, bottom:number){
      this.left = left;
      this.right = right;
      this.top = top;
      this.bottom = bottom;
    }

    getWidth():number{
      return this.right - this.left;
    }
    
    getHeight():number{
      return this.bottom - this.top;
    }
  }