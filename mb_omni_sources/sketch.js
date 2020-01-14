var omniSourcePositions = [];

//TODO:
//převést do instance módu
var sketch = function(p){

}

var p5canvas = new p5(sketch);
function setup() {
  var controll_panel = createCanvas(800,100);
  controll_panel.parent('controllPanel');
  var cnvs = createCanvas(800, 800); 
  cnvs.parent('canvasParent');
  cnvs.style('position', 'absolute');
  cnvs.style('left','0px');

  let point = new DraggablePoint(createVector(400, 300));
  omniSourcePositions.push(point);
}

function draw() {
  clear();
  stroke(120,50,255);
  omniSourcePositions.forEach(element => {
    element.show();
  });
}