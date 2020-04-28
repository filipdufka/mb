import { p5InstanceExtensions, Vector } from 'p5';

export class DraggablePoint {
    pos : Vector; 
    r : number; interactable; hover; drag; 
    static hoverObject;

    constructor(pos : Vector) {
      this.pos = pos;
      this.r = 6; //radius
      this.interactable = true;
      this.hover = false;
      this.drag = false;      
    }

    show(p5 : p5InstanceExtensions){
        this.getHover(p5);
        if(this.hover){
            p5.strokeWeight(4);
        }else if(this.drag){
            p5.strokeWeight(8);
        }else{
            p5.noStroke();
        }
        p5.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
    }

    getHover(p5 : p5InstanceExtensions){
        let m = p5.createVector(p5.mouseX, p5.mouseY);
        if(this.pos.dist(m) < this.r){
            this.hover = true;
            DraggablePoint.hoverObject = this;
            if(p5.mouseIsPressed){
                this.drag = true;
            }
        }else{
            this.hover = false;            
        }
        if(p5.mouseIsPressed == false){
            this.drag = false;
        }

        if(this.drag && DraggablePoint.hoverObject === this){
            this.pos = m;
        }
    }
}