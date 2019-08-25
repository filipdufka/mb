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
  cosGraph = new Graph(new Rectangle(guides.vs[2],guides.hs[2],guides.vs[3],guides.hs[3]));

}

function draw() {
  background(220);
  clear();  
  stroke(200);
  noFill();
  
// Data
  t = millis() * speed;
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
  circle(guides.vs[2], lerp(guides.hs[0], guides.hs[1], dataSin[0]) , 20);
  circle(guides.vs[2], lerp(guides.hs[2], guides.hs[3], dataCos[0]) , 20);

  // Circle Point
  let cpx = lerp(guides.vs[0], guides.vs[1], 1-dataCos[0]); 
  let cpy = lerp(guides.hs[0], guides.hs[1], dataSin[0]);
  circle( cpx, cpy, 20);

  // Line Guides
  arc(guides.vs[1], guides.hs[2], 2 * graphHeight * dataCos[0], 2 * graphHeight *  dataCos[0], HALF_PI , PI);  

  // Connect Lines
  line(cpx, cpy, cpx, guides.hs[2]);
  line( guides.vs[1], 
        lerp(guides.hs[2], guides.hs[3], dataCos[0]), 
        guides.vs[2], 
        lerp(guides.hs[2], guides.hs[3], dataCos[0]));
  line( cpx, 
        cpy, 
        guides.vs[2], 
        cpy);
}