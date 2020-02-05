var sin_cos_sketch = function(p){
  let sinGraph, cosGraph;
let guides;
let margin = 50, graphHeight;
let speed = 0.0005, periodsToShow = 1.5;

// čistý start
// tlačítko reset
// speed
// vyznačená nulová fáze
// popisky - stupně
// výseč kruhu k nule
// popisky - sin cos
// hide tlačítko na cos

p.setup = function() {
  p.createCanvas(1600, 550);

  guides = new Guides(p);
  graphHeight = (p.height - 3 * margin) / 2;

  guides.addHorizontal(margin);
  guides.addHorizontal(margin + graphHeight);
  guides.addHorizontal(margin + graphHeight + margin);
  guides.addHorizontal(margin + graphHeight + margin + graphHeight);

  guides.addVertical(margin);
  guides.addVertical(margin + graphHeight);
  guides.addVertical(margin + graphHeight + margin);
  guides.addVertical(p.width - margin);

  sinGraph = new Graph(p, new Rectangle(guides.vs[2],guides.hs[0],guides.vs[3],guides.hs[1]));
  sinGraph.setYMinMax(-1,1);
  cosGraph = new Graph(p, new Rectangle(guides.vs[2],guides.hs[2],guides.vs[3],guides.hs[3]));
  cosGraph.setYMinMax(-1,1);
}

p.draw = function() {
  p.clear();  
  p.stroke(200);
  p.noFill();
  
// Data
  t = p.millis() * speed;
  //t = 0;
  dataSin = generateSin(t, periodsToShow );
  dataCos = generateSin(t + Math.PI/2, periodsToShow );
  
// Guides
  guides.show();  

// Graphs
  sinGraph.setData(dataSin);
  sinGraph.show();
  
  cosGraph.setData(dataCos);
  cosGraph.show();

  // Circle
  p.circle(guides.vs[0] + graphHeight/2, margin + graphHeight/2,graphHeight);

  // Points
  p.circle(guides.vs[2], sinGraph.getPosition(0).y , 20);
  p.circle(guides.vs[2], cosGraph.getPosition(0).y , 20);

  // Circle Point
  let cpx = p.map(dataCos[0],-1,1,guides.vs[0], guides.vs[1]);
  let cpy = sinGraph.getPosition(0).y;
  p.circle( cpx, cpy, 20);

  // Line Guides
  var arcR = (cosGraph.getPosition(0).y - guides.vs[2]) * 2;
  p.arc(guides.vs[1], guides.hs[2], arcR, arcR, Math.PI/2 , Math.PI);  

  // Connect Lines
  p.line(cpx, cpy, cpx, guides.hs[2]);
  p.line( guides.vs[1], 
        cosGraph.getPosition(0).y,
        guides.vs[2], 
        cosGraph.getPosition(0).y);
  p.line( cpx, 
        cpy, 
        guides.vs[2], 
        cpy);
}
}

var p5canvas = new p5(sin_cos_sketch);