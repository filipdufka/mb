let points;

function setup() {
  createCanvas(windowWidth, windowHeight);
  points = [];
  for(let i = 0; i < 2000; i++){
    points[i] = createVector(random(width), random(height));   
  }
}

function draw() {
  clear();
  noStroke();
  
  let c2 = color(20,125,255);
  let c1 = color(255,80,20);
  
  for(let i = 0; i < points.length; i++){
    let p = points[i];
    let sinX = sin((millis() * 0.1 - p.x) * 0.05);
    let cosX = cos((millis() * 0.1 - p.x) * 0.05);
    fill(lerpColor(c2, c1 ,map(cosX, -1, 1, 0,1)));
    circle(p.x + sinX * 10, p.y, 5);
  }

  strokeWeight(3);
  for(let i = 1; i < width; i++){
    let y1 = -cos((millis() * 0.1 - i - 1) * 0.05);
    let y2 = -cos((millis() * 0.1 - i) * 0.05);
    
    stroke(lerpColor(c1, c2,map(y2, -1, 1, 0,1)));
    y1 *= 20;
    y2 *= 20;
    y1 += 70;
    y2 += 70;
    line(i-1,y1,i,y2);
  }
}

