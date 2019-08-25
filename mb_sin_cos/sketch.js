let dataSin, dataCos;
let angle, radius, margin, speed, stretch;
let sinGraph, cosGraph;

let guides;

function setup() {
  createCanvas(800, 550);
  
  dataSin = [];
  dataCos = [];

  radius = 100;
  margin = 50;
  speed = 0.002;
  stretch = 0.1;

  sinGraph = new Graph(new Rectangle(0,0,400,200));
  cosGraph = new Graph(new Rectangle(0,200,400,400));
  guides = new Guides();
  let graphHeight = (height - 3 * margin) / 2;

  guides.addHorizontal(margin);
  guides.addHorizontal(margin + graphHeight);
  guides.addHorizontal(margin + graphHeight + margin);
  guides.addHorizontal(margin + graphHeight + margin + graphHeight);

}

function draw() {
  background(220);
  clear();
  
  stroke(200);
  
  // guides
  
  // line(2 * margin + 2 * radius + 5,0,2 * margin + 2 * radius + 5,height);
  // line(2 * margin + 2 * radius-margin,0,2 * margin + 2 * radius-margin,height);
  // line(0,height-margin,width, height-margin);
  // line(0,margin,width, margin);
  // line(0,height/2-margin/2,width, height/2-margin/2);
  // line(0,height/2+margin/2,width, height/2+margin/2);

  t = millis() * speed;
  
  dataSin2 = generateSin(t, 1.5 );
  sinGraph.setData(dataSin2);
  sinGraph.show();
  
  dataCos2 = generateSin(t + PI/2, 1.5 );
  cosGraph.setData(dataCos2);
  cosGraph.show();

  guides.show();

  
  for(let i = 0; i < 100; i++){    
    angle = (i + millis() * speed) * stretch;
    dataSin[i] =  2 * radius * (sin(angle) + 1) * 0.5;
    dataCos[i] =  2 * radius * (cos(angle) + 1) * 0.5;
  }
  
  let lastX, cosY, sinY;
  
  noFill();  
  strokeWeight(2);
  stroke(255,127,0);
  
  for(let i = 1; i < dataSin.length; i++){
    let x1 = map(i-1, 0, dataSin.length, width - margin, 2 * margin + 2 * radius);
    let x2 = map(i, 0, dataSin.length, width - margin, 2 * margin + 2 * radius );
    lastX = x2;
    cosY = dataCos[i] + 200 + 2 * margin;
    sinY = dataSin[i] + margin;
    line(x1,dataSin[i-1] + margin,x2,sinY);
    line(x1,dataCos[i-1] + 200 + 2 * margin,x2,cosY);
  }
  
  circle(margin + radius, margin + radius,radius*2);
  
  
  strokeWeight(1);
  stroke(110);
  
  arc(margin + 2 * radius, 2 * margin + 2 * radius,(cos(angle) + 1)  * radius * 2, (cos(angle)+1) * radius * 2, HALF_PI , PI);  
  
  fill(0);
  
  let circleX = radius + margin - cos(angle) * radius;  
  let circleY = radius + margin + sin(angle) * radius;
  
  circle(circleX,circleY,10);
  
  circle(lastX,sinY,10);
   circle(lastX,cosY,10); 
  
  line(lastX, sinY, circleX, circleY);
  line(circleX, sinY, circleX, 2 * margin + 2 * radius);
  line(2 * margin + 2 * radius, cosY, 2 * margin + 2 * radius - margin, cosY);



  
  
}