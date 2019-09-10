class Checkbox{
    constructor(){
        this.border = new Rectangle(50,50,64,64);
        this.value = false;
        this.animValue = 0;
        this.margin = 2;
        this.step = 2;
        this.hover = false;
        this.clicked = false;
        this.label = "";
        this.lineHeights = [];
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
        fill(0);
        noStroke();
        textAlign(LEFT);
        text(this.label, this.border.right + 5, this.border.top + this.border.getHeight()/2.0 + 4);
  }

    showCheckbox(){
        this.getHover();

        noFill();
        strokeWeight(1);
        if(this.hover){    
            stroke(0);
        }else{
            stroke(180);
        }
        
        line(this.border.left,this.border.top,this.border.left,this.border.bottom);
        line(this.border.left,this.border.top,this.border.right,this.border.top);
        line(this.border.right,this.border.top,this.border.right,this.border.bottom);
        line(this.border.left,this.border.bottom,this.border.right,this.border.bottom);

        let i = 0;
        for(let posX = this.border.left + this.margin; posX <= this.border.right - this.margin; posX += this.step){
            let relative = norm(posX, this.border.left + this.margin, this.border.right);
            let targetHeight = relative < this.animValue?0:1;
            
            if(i < this.lineHeights.length){
                this.lineHeights[i] = lerp(this.lineHeights[i], targetHeight, 0.5);
            }else{
                this.lineHeights[i] = targetHeight;    
            }
            let posY = map(this.lineHeights[i], 0,1, this.border.top + this.margin, this.border.bottom - this.margin)
            line(posX, posY, posX, this.border.bottom - this.margin);

            i++;
        }
        
    }

    show(){
        let speed = 0.08;
        speed *= this.value?1:-1;
        this.animValue = constrain(this.animValue + speed, 0, 1);
        this.showCheckbox();
        this.showLabel();
    }

    getHover(){
        if(mouseX <= this.border.right && 
            mouseX >= this.border.left &&
            mouseY <= this.border.bottom &&
            mouseY >= this.border.top){
                this.hover = true;
                if(mouseIsPressed && this.clicked == false){
                    this.clicked = true;
                    this.value = !this.value;
                }
            }else{
                this.hover = false;
            }
        if(mouseIsPressed == false){
            this.clicked = false;
        }
    }



}