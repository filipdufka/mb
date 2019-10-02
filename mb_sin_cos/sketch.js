let sinGraph, cosGraph;
let guides;
let margin = 50, graphHeight;
let speed = 0.0005, periodsToShow = 1.5;

function setup() {
  createCanvas(800, 550);

  guides = new Guides();
  graphHeight = (height - 3 * margin) / 2;

  guides.addHorizontal(margin);
  guides.addHorizontal(margin + graphHeight);
  guides.addHorizontal(margin + graphHeight + margin);
  guides.addHorizontal(margin + graphHeight + margin + graphHeight);

  guides.addVertical(margin);
  guides.addVertical(margin + graphHeight);
  guides.addVertical(margin + graphHeight + margin);
  guides.addVertical(width - margin);

  sinGraph = new Graph(new Rectangle(guides.vs[2],guides.hs[0],guides.vs[3],guides.hs[1]));
  sinGraph.setYMinMax(-1,1);
  cosGraph = new Graph(new Rectangle(guides.vs[2],guides.hs[2],guides.vs[3],guides.hs[3]));
  cosGraph.setYMinMax(-1,1);
}

function draw() {
  background(220);
  clear();  
  stroke(200);
  noFill();
  
// Data
  t = millis() * speed;
  //t = 0;
  dataSin = generateSin(t, periodsToShow );
  dataCos = generateSin(t + PI/2, periodsToShow );
  
// Guides
  guides.show();  

// Graphs
  sinGraph.setData(dataSin);
  sinGraph.show();
  
  cosGraph.setData(dataCos);
  cosGraph.show();

  // Circle
  circle(guides.vs[0] + graphHeight/2, margin + graphHeight/2,graphHeight);

  // Points
  circle(guides.vs[2], sinGraph.getPosition(0).y , 20);
  circle(guides.vs[2], cosGraph.getPosition(0).y , 20);

  // Circle Point
  let cpx = map(dataCos[0],-1,1,guides.vs[0], guides.vs[1]);
  let cpy = sinGraph.getPosition(0).y;
  circle( cpx, cpy, 20);

  // Line Guides
  var arcR = (cosGraph.getPosition(0).y - guides.vs[2]) * 2;
  arc(guides.vs[1], guides.hs[2], arcR, arcR, HALF_PI , PI);  

  // Connect Lines
  line(cpx, cpy, cpx, guides.hs[2]);
  line( guides.vs[1], 
        cosGraph.getPosition(0).y,
        guides.vs[2], 
        cosGraph.getPosition(0).y);
  line( cpx, 
        cpy, 
        guides.vs[2], 
        cpy);
}