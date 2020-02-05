class Slider{
      constructor(p, minValue, maxValue, step = 0.000001){
            this.minValue = minValue;
            this.maxValue = maxValue;
            this.step = step;
            this.value = 0;
            this.border = new Rectangle(50,10,150,30);
            this.hover = false;
            this.clicked = false;
            this.label = "";
            this.p = p;
      }

      setRectangle(rect){
            this.border = rect;
      }

      setLabel(label){
            this.label = label;
      }

      getValue(){
            return this.p.lerp(this.minValue, this.maxValue, this.value);
      }

      setNormValue(val){
            var steps = (this.maxValue - this.minValue) / this.step;
            var normStep = 1 / steps;
            this.value = Math.round(val / normStep) * normStep;
      }

      setValue(val){
            this.setNormValue(this.p.map(val, this.minValue, this.maxValue, 0, 1));
      }

      show(){
            this.getHover(this.p);
            this.showSlider(this.p);
            this.showHandle(this.p);  
            this.showLabel(this.p);          
      }

      showSlider(p){       
            p.stroke(0);
            p.strokeWeight(1);
            p.noFill();       
            let posY = this.border.top + this.border.getHeight()/2.0;
            p.line(this.border.left, posY, this.border.right, posY);
      }

      showHandle(p){            
            if(this.hover || this.clicked){
                  p.stroke(50,250,255);
            }else{
                  p.stroke(0);
            }
            p.strokeWeight(2);
            p.noFill();            
            let posX = p.lerp(this.border.left, this.border.right, this.value);
            p.line(posX, this.border.top, posX, this.border.bottom);
      }

      showLabel(p){
            p.fill(0);
            p.noStroke();
            p.textAlign(p.RIGHT);
            p.text(this.label, this.border.left - 5, this.border.top + this.border.getHeight()/2.0 + 4);
      }

      getHover(){
            let p = this.p;
            let m = p.createVector(p.mouseX, p.mouseY);
            let posX = p.lerp(this.border.left, this.border.right, this.value);
            let a = p.createVector(posX, this.border.top);
            let b = p.createVector(posX, this.border.bottom);
            let dist = distToSegment(m,a,b);
            if(dist < 5 && this.hover == false){
                  this.hover = true;
                  if(p.mouseIsPressed){
                        this.clicked = true;                        
                  }
            }else{
                  this.hover = false;                  
            }
            if(p.mouseIsPressed == false){
                  this.clicked = false;
            }
            if(this.clicked){
                  
                  this.setNormValue(p.constrain(p.norm(p.mouseX, this.border.left, this.border.right),0,1)) ;
            }
      }
      
}

