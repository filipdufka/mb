class Checkbox{
    constructor(p){
        this.border = new Rectangle(50,50,64,64);
        this.value = false;
        this.animValue = 0;
        this.margin = 2;
        this.step = 2;
        this.hover = false;
        this.clicked = false;
        this.label = "";
        this.lineHeights = [];
        this.p = p;
    }

    setRectangle(rect){
        this.border = rect;
    }

    setLabel(label){
        this.label = label;
    }

    getValue(){
        return this.value;
    }

    showLabel(){
        this.p.fill(0);
        this.p.noStroke();
        this.p.textAlign(this.p.LEFT);
        this.p.text(this.label, this.border.right + 5, this.border.top + this.border.getHeight()/2.0 + 4);
  }

    showCheckbox(){
        this.getHover();

        this.p.noFill();
        this.p.strokeWeight(1);
        if(this.hover){    
            this.p.stroke(0);
        }else{
            this.p.stroke(180);
        }
        
        this.p.line(this.border.left,this.border.top,this.border.left,this.border.bottom);
        this.p.line(this.border.left,this.border.top,this.border.right,this.border.top);
        this.p.line(this.border.right,this.border.top,this.border.right,this.border.bottom);
        this.p.line(this.border.left,this.border.bottom,this.border.right,this.border.bottom);

        let i = 0;
        for(let posX = this.border.left + this.margin; posX <= this.border.right - this.margin; posX += this.step){
            let relative = this.p.norm(posX, this.border.left + this.margin, this.border.right);
            let targetHeight = relative < this.animValue?0:1;
            
            if(i < this.lineHeights.length){
                this.lineHeights[i] = this.p.lerp(this.lineHeights[i], targetHeight, 0.5);
            }else{
                this.lineHeights[i] = targetHeight;    
            }
            let posY = this.p.map(this.lineHeights[i], 0,1, this.border.top + this.margin, this.border.bottom - this.margin)
            this.p.line(posX, posY, posX, this.border.bottom - this.margin);

            i++;
        }
        
    }

    show(){
        let speed = 0.08;
        speed *= this.value?1:-1;
        this.animValue = this.p.constrain(this.animValue + speed, 0, 1);
        this.showCheckbox();
        this.showLabel();
    }

    getHover(){
        if(this.p.mouseX <= this.border.right && 
            this.p.mouseX >= this.border.left &&
            this.p.mouseY <= this.border.bottom &&
            this.p.mouseY >= this.border.top){
                this.hover = true;
                if(this.p.mouseIsPressed && this.clicked == false){
                    this.clicked = true;
                    this.value = !this.value;
                }
            }else{
                this.hover = false;
            }
        if(this.p.mouseIsPressed == false){
            this.clicked = false;
        }
    }



}