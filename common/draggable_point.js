
class DraggablePoint {
    constructor(pos) {
      this.pos = pos;
      this.r = 6; //radius
      this.interactable = true;
      this.hover = false;
      this.drag = false;      
    }

    show(){
        this.getHover();
        if(this.hover){
            strokeWeight(4);
        }else if(this.drag){
            strokeWeight(8);
        }else{
            strokeWeight(1);
        }
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    getHover(){
        let m = createVector(mouseX, mouseY);
        if(this.pos.dist(m) < this.r){
            this.hover = true;
            if(mouseIsPressed){
                this.drag = true;
            }
        }else{
            this.hover = false;
        }
        if(mouseIsPressed == false){
            this.drag = false;
        }

        if(this.drag){
            this.pos = m;
        }
    }
}