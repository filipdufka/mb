
// class DraggablePoint {
//     constructor(pos) {
//       this.pos = pos;
//       this.r = 6; //radius
//       this.interactable = true;
//       this.hover = false;
//       this.drag = false;      
//     }

//     show(p){
//         this.getHover(p);
//         if(this.hover){
//             p.strokeWeight(4);
//         }else if(this.drag){
//             p.strokeWeight(8);
//         }else{
//             p.noStroke();
//         }
//         p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
//     }

//     getHover(p){
//         let m = p.createVector(p.mouseX, p.mouseY);
//         if(this.pos.dist(m) < this.r){
//             this.hover = true;
//             DraggablePoint.hoverObject = this;
//             if(p.mouseIsPressed){
//                 this.drag = true;
//             }
//         }else{
//             this.hover = false;            
//         }
//         if(p.mouseIsPressed == false){
//             this.drag = false;
//         }

//         if(this.drag && DraggablePoint.hoverObject === this){
//             this.pos = m;
//         }
//     }
// }