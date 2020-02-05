var logo_sketch = function(p){
let orderRatio = 0;
let targetOrderRatio = 0.98;

let font,
  fontsize = 40;

p.preload = function() {
  font = p.loadFont('../assets/Lato-Light.ttf');
}

p.setup = function() {
  p.createCanvas(800, 800);
  p.textFont(font);
  p.textSize(fontsize);
  p.textAlign(p.CENTER, p.CENTER);
}

p.draw = function() {
  p.clear();
  
  let split = 115;
  
  orderRatio = p.lerp(orderRatio, targetOrderRatio, 0.005);
  
  p.textSize(fontsize);
  p.text('M    I    C    H    A    L\nB    R    U    N    A', p.width/2,p.height/2 + 150);
  p.textSize(fontsize * 0.5);
  p.text('A U D I O   C O N S U L T A N T', p.width/2,p.height/2 + 230);
  
  p.translate(p.width/2 + 20, p.height/2 - 40);
  p.translate(-split,0);
  drawM(p, orderRatio); 
  
  p.resetMatrix();
  p.translate(p.width/2 + 20, p.height/2 - 40);
  p.translate(split,0);
  drawB(p, orderRatio); 
  
}
}
var p5canvas = new p5(logo_sketch);