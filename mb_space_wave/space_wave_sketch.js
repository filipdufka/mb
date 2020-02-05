var space_wave_sketch = function(p){
let points;
let sinGraph;

p.setup = function() {
  p.createCanvas(800, 600);
  points = [];
  for(let i = 0; i < 100; i++){
    points[i] = new p5.Vector(p.random(p.width), p.random(p.height));   
  }
}

p.draw = function() {
  p.clear();
  p.noStroke();
  
  let c2 = p.color(20,125,255);
  let c1 = p.color(255,80,20);
  
  for(let i = 0; i < points.length; i++){
    let point = points[i];
    let sinX = p.sin((p.millis() * 0.1 - point.x) * 0.05);
    let cosX = p.cos((p.millis() * 0.1 - point.x) * 0.05);
    p.fill(p.lerpColor(c2, c1 , p.map(cosX, -1, 1, 0,1)));
    p.circle(point.x + sinX * 10, point.y, 5);
  }

  p.strokeWeight(3);
  for(let i = 1; i < p.width; i++){
    let y1 = -p.cos((p.millis() * 0.1 - i - 1) * 0.05);
    let y2 = -p.cos((p.millis() * 0.1 - i) * 0.05);
    
    p.stroke(p.lerpColor(c1, c2, p.map(y2, -1, 1, 0,1)));
    y1 *= 20;
    y2 *= 20;
    y1 += 70;
    y2 += 70;
    p.line(i-1,y1,i,y2);
  }
}

}

var p5canvas = new p5(space_wave_sketch);