var omniSourcePositions = [];

var omni_sources_sketch = function(p){
  p.setup = function(){
    var cnvs = p.createCanvas(800, 800); 
    cnvs.parent('canvasParent');
    cnvs.style('position', 'absolute');
    cnvs.style('left','0px');
  
    omniSourcePositions.push(new DraggablePoint(p.createVector(400.0, 300.0)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(300.0, 400.0)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(500.0, 400.0)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(550.0, 400.0)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(600.0, 400.0)));
  }

  p.draw = function(){
    p.clear();
    p.stroke(120,50,255);

    for (let s = 0; s < omniSourcePositions.length; s++) {
      const element = omniSourcePositions[s];
      if(numOfOmniSources > s){
        omniSourcePositions[s].pos.x = Math.abs(omniSourcePositions[s].pos.x); 
        element.show(p);
      }else{
        omniSourcePositions[s].pos.x = -Math.abs(omniSourcePositions[s].pos.x); 
      }
    }
  }
}

var p5oss = new p5(omni_sources_sketch);