import { Vector } from "p5";
import { DraggablePoint } from "./draggablePoint";
import { vectorLerp } from "./commonMath";

export class BezierCurve{
    precision : number;
    points : DraggablePoint[];
    constructor(){
        this.precision = 100;
        this.points = [];
    }

    createNewPoint(pos) {
        var anchor = new DraggablePoint(pos);
        this.points.push(anchor);
    }

    getBezierPoint(t, segment) {
        let A = this.getSegmentPoint(segment, 0).pos;
        let B = this.getSegmentPoint(segment, 1).pos;
        let C = this.getSegmentPoint(segment, 2).pos;
        let D = this.getSegmentPoint(segment, 3).pos;
        let AB = vectorLerp(A, B, t);
        let BC = vectorLerp(B, C, t);
        let CD = vectorLerp(C, D, t);
        let ABBC = vectorLerp(AB, BC, t);
        let BCCD = vectorLerp(BC, CD, t);
        return vectorLerp(ABBC, BCCD, t);
    }

    getSegmentPoint(segment, index) {
        return this.points[3 * segment + index];
    }

    getAnchorPoints():DraggablePoint[]{
        return this.points;
    }

    getDrawPoints():Vector[]{
        let pointsToReturn = [];        
        let segments = Math.floor((this.points.length - 1) / 3);
        for (let s = 0; s < segments; s++) {
            for (let f = 0; f < this.precision; f++) {
                let E = this.getBezierPoint(f / this.precision, s);
                let F = this.getBezierPoint((f + 1) / this.precision, s);
                pointsToReturn.push(E);

                if(s == segments - 1 && f == this.precision - 1){
                    pointsToReturn.push(F);
                }
            }
        } 
        return pointsToReturn;
    }
}


  







//     let pointsL = [];
// let pointsR = [];
// let pointsLjustPos = [];
// let pointsRjustPos = [];
// let selectedPoint, draggedPoint;
// let startDrag;
// let justCreated;
// let visibleAnchors = true;
// let visiblePoints = true;
// let precision = 16;
// var pSlider;
// let epsilon = 0.7;
// var eSlider;
// var eCheckbox;
// var pCheckbox;


// function setup() {
//   createCanvas(1000, 420);
//   pSlider = createSlider(1, 100, 32);
//   pSlider.position(200, 3);
//   eSlider = createSlider(0, 3, 0.7, 0.01);
//   eSlider.position(500, 3);
//   eCheckbox = createCheckbox('', true);
//   eCheckbox.position(760, 6);
//   pCheckbox = createCheckbox('', true);
//   pCheckbox.position(900, 6);
//   button = createButton('Reset');
//   button.position(930, 4);
//   button.mousePressed(init);
//   init();
// }

// function init() {
//   pointsL = [];
//   pointsR = [];
//   createNewPoint(createVector(150, 100));
//   createNewPoint(createVector(10, 400));
//   createNewPoint(createVector(370, 100));
//   createNewPoint(createVector(150, 200));

//   createNewPoint(createVector(150, 350));
//   createNewPoint(createVector(290, 250));
//   createNewPoint(createVector(210, 400));
// }

// function draw() {
//   clear();
//   precision = pSlider.value();
//   epsilon = eSlider.value();
//   visibleAnchors = eCheckbox.checked();
//   visiblePoints = pCheckbox.checked();

//   noStroke();
//   //UI
//   textAlign(LEFT);
//   textSize(16);
//   text("Maximální segmentace: ", 20, 20);
//   text(pSlider.value(), 350, 20);
//   text("Epsilon: ", 430, 20);
//   text(eSlider.value(), 650, 20);
//   text("Úprava: ", 700, 20);
//   text("Viditelné body: ", 790, 20);

//   textAlign(CENTER);
//   textSize(18);
//   text("Neadaptivní rasterizace", width / 4, 60);
//   text("Adaptivní rasterizace", 3 * width / 4, 60);

//   strokeWeight(1);
//   stroke(20, 20, 20, 100);
//   line(width / 2, 40, width / 2, height);



//   //Draw
//   if (visibleAnchors) {
//     selectedPoint = null;
//     for (let p = 0; p < pointsL.length; p++) {
//       pointsL[p].draw(p % 3 != 0);
//     }


//     // Interaction  
//     if (mouseIsPressed) {
//       if (draggedPoint == null) {
//         if (selectedPoint != null) {
//           draggedPoint = selectedPoint;
//           startDrag = createVector(mouseX, mouseY);
//         } else {
//           if (mouseY > 40 && justCreated == false) {
//             createNewPoint(createVector(mouseX % (width / 2), mouseY), mouseX < (width / 2));
//             justCreated = true;
//           }
//         }
//       } else {
//         let dif = draggedPoint.pos.x - draggedPoint.corresponding.pos.x;
//         draggedPoint.pos = createVector(mouseX, mouseY);
//         draggedPoint.corresponding.pos = createVector(mouseX - dif, mouseY);
//       }
//     } else {
//       startDrag = null;
//       draggedPoint = null;
//       justCreated = false;
//     }
//   }

//   // Draw
//   drawBezier();
//   drawAdaptiveBezier();
  
//   noStroke();
//   textAlign(LEFT);
//   textSize(10);
//   text("Počet bodů: " + pointsLjustPos.length, 10, height);
//   text("Počet bodů: " + pointsRjustPos.length, width/2 + 10, height);
// }

// function checkEvent() {
//   visibleAnchors = this.checked();
// }

// function drawBezier() {
//   pointsLjustPos = [];
//   let segments = floor((pointsL.length - 1) / 3);
//   for (let s = 0; s < segments; s++) {
//     if (visibleAnchors) {
//       let A = getSegmentPoint(s, 0).pos;
//       let B = getSegmentPoint(s, 1).pos;
//       let C = getSegmentPoint(s, 2).pos;
//       let D = getSegmentPoint(s, 3).pos;
//       strokeWeight(1);
//       stroke(150);
//       line(A.x, A.y, B.x, B.y);
//       line(C.x, C.y, D.x, D.y);
//     }
//     for (let f = 0; f < precision; f++) {
//       let E = getBezierPoint(f / precision, s);
//       let F = getBezierPoint((f + 1) / precision, s);
//       pointsLjustPos.push(E);
//       strokeWeight(6);
//       stroke(50);
//       line(E.x, E.y, F.x, F.y);
//     }
//   }
//   if (visiblePoints) {
//     for (let p = 0; p < pointsLjustPos.length; p++) {
//       stroke(255);
//       strokeWeight(4);
//       point(pointsLjustPos[p].x, pointsLjustPos[p].y);
//     }
//   }
// }





// function createNewPoint(pos) {
//   var A = new AnchorPoint(pos, true);
//   var B = new AnchorPoint(pos.copy().add(createVector(width / 2, 0)), false);
//   A.corresponding = B;
//   B.corresponding = A;
//   pointsL.push(A);
//   pointsR.push(B);
//   selectedPoint = A;
// }

// class AnchorPoint {
//   constructor(pos, L) {
//     this.pos = pos;
//     this.r = 6;
//     this.hover = false;
//     this.drag = false;
//     this.L = L;
//     this.corresponding = null;
//   }

//   draw(circ) {
//     if (dist(this.pos.x, this.pos.y, mouseX, mouseY) <= this.r) {
//       this.hover = true;
//       selectedPoint = this;
//       fill(124, 121, 74);

//     } else {
//       fill(150);
//       this.hover = false;
//     }
//     noStroke();
//     if (circ) {
//       circle(this.pos.x, this.pos.y, this.r);
//     } else {
//       rectMode(RADIUS);
//       square(this.pos.x, this.pos.y, this.r);
//     }
//   }
// }

// function drawAdaptiveBezier() {
//   pointsRjustPos = [];
//   let segments = floor((pointsL.length - 1) / 3);
//   for (let s = 0; s < segments; s++) {
//     let positions = getSegmentPositions(pointsR.slice(3 * s, 3 * s + 4));
//     subdivideSegment(positions, 0);
//   }
//   if (visiblePoints) {
//     for (let p = 0; p < pointsRjustPos.length; p++) {
//       stroke(255);
//       strokeWeight(4);
//       point(pointsRjustPos[p].x, pointsRjustPos[p].y);
//     }
//   }
// }

// function getSegmentPositions(segment) {
//   var positions = [];
//   for (let p = 0; p < segment.length; p++) {
//     positions.push(segment[p].pos.copy());
//   }
//   return positions;
// }



// }
// }