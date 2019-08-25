let orderRatio = 0;
let targetOrderRatio = 0.98;

let font,
  fontsize = 40;

function preload() {
  font = loadFont('../assets/Lato-Light.ttf');
}

function setup() {
  createCanvas(800, 800);
  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);
}

function draw() {
  clear();
  
  let split = 115;
  
  orderRatio = lerp(orderRatio, targetOrderRatio, 0.005);
  
  textSize(fontsize);
  text('M    I    C    H    A    L\nB    R    U    N    A', width/2,height/2 + 150);
  textSize(fontsize * 0.5);
  text('A U D I O   C O N S U L T A N T', width/2,height/2 + 230);
  
  translate(width/2 + 20, height/2 - 40);
  translate(-split,0);
  drawM(); 
  
  resetMatrix();
  translate(width/2 + 20, height/2 - 40);
  translate(split,0);
  drawB(); 
  
}