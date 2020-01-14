var omniSourcePositions = [];

//TODO:
//převést do instance módu
var omnni_sources_sketch = function(p){
  p.setup = function(){
    var cnvs = p.createCanvas(800, 800); 
    cnvs.parent('canvasParent');
    cnvs.style('position', 'absolute');
    cnvs.style('left','0px');
  
    omniSourcePositions.push(new DraggablePoint(p.createVector(400.0, 300.0)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(-300.0, 400.0)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(500.0, 400.0)));
  }

  p.draw = function(){
    p.clear();
    p.stroke(120,50,255);
    omniSourcePositions.forEach(element => {
      element.show(p);
    });
  }
}

var p5canvas = new p5(omnni_sources_sketch);