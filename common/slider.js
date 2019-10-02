class Slider{
      constructor(minValue, maxValue, step = 0.000001){
            this.minValue = minValue;
            this.maxValue = maxValue;
            this.step = step;
            this.value = 0;
            this.border = new Rectangle(50,10,150,30);
            this.hover = false;
            this.clicked = false;
            this.label = "";
      }

      setRectangle(rect){
            this.border = rect;
      }

      setLabel(label){
            this.label = label;
      }

      getValue(){
            return lerp(this.minValue, this.maxValue, this.value);
      }

      show(){
            this.getHover();
            this.showSlider();
            this.showHandle();  
            this.showLabel();          
      }

      showSlider(){       
            stroke(0);
            strokeWeight(1);
            noFill();       
            let posY = this.border.top + this.border.getHeight()/2.0;
            line(this.border.left, posY, this.border.right, posY);
      }

      showHandle(){            
            if(this.hover || this.clicked){
                  stroke(50,250,255);
            }else{
                  stroke(0);
            }
            strokeWeight(2);
            noFill();            
            let posX = lerp(this.border.left, this.border.right, this.value);
            line(posX, this.border.top, posX, this.border.bottom);
      }

      showLabel(){
            fill(0);
            noStroke();
            textAlign(RIGHT);
            text(this.label, this.border.left - 5, this.border.top + this.border.getHeight()/2.0 + 4);
      }

      getHover(){
            let m = createVector(mouseX, mouseY);
            let posX = lerp(this.border.left, this.border.right, this.value);
            let a = createVector(posX, this.border.top);
            let b = createVector(posX, this.border.bottom);
            let dist = distToSegment(m,a,b);
            if(dist < 5 && this.hover == false){
                  this.hover = true;
                  if(mouseIsPressed){
                        this.clicked = true;                        
                  }
            }else{
                  this.hover = false;                  
            }
            if(mouseIsPressed == false){
                  this.clicked = false;
            }
            if(this.clicked){
                  this.value = constrain(norm(mouseX, this.border.left, this.border.right),0,1) ;
            }
      }
      
}

function sqr(x) { return x * x }
function dist2(v, w) { return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p, v, w) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, { x: v.x + t * (w.x - v.x),
                    y: v.y + t * (w.y - v.y) });
}
function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }