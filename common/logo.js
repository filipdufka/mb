function drawLogo(){

}

function drawM(p, orderRatio){
// verticals

    p.strokeWeight(2);
    
    let verticalLines = 17;
    let mWidth = 200;
    let mHeight = 250;  
    let base = mHeight/2;
    
    for(let i = 0; i < verticalLines; i++){
    let t = i / (verticalLines - 1);
    let cut = mCutout(p, t);  
    let n = p.noise(t * 4, p.millis() * 0.005);
    let y = p.lerp (n, cut, orderRatio);
    
    let x = p.map(i, 0, verticalLines - 1, - mWidth/2, mWidth/2);
    p.line(x, base , x, base - mHeight * y);
    }
}

function mCutout(p, t){
    let cleavage = 0.52;
    return p.map(p.abs(t - 0.5),0, 0.5, cleavage,1);
}

// horizontals
let horizontalLines = 21;
let circleRatio = 0.45;
let r1 = 0.5;
let r2 = 0.6;
let bWidth = 200;
let bHeight = 250;
let base = -bWidth/2;

function drawB(p, orderRatio) {
  for (let i = 0; i < horizontalLines; i++) {
    let t = i / (horizontalLines - 1);
    
    let n = p.noise(t * 3, p.millis() * 0.005);
    let cut = cutoutB(p, t);
    let x = p.lerp (n, cut, orderRatio);
    
    let y = p.map(i, 0, horizontalLines - 1, -bHeight / 2, bHeight / 2);
    p.strokeWeight(2);
    p.line(base, y, base + bWidth * x, y);
  }
}

function cutoutB(p, t) {
    let d1 = bHeight * circleRatio;
    let d2 = bHeight - d1;
    let x = bWidth / 2;

    let t1 = p.norm(t, 0, circleRatio);
    let t2 = p.norm(t, circleRatio, 1);
    let r = r1;
    let sinx = 0;
    if (t < circleRatio) {
      sinx = 2 * p.abs(t1 - 0.5);
    } else {
      sinx = 2 * p.abs(t2 - 0.5);
      r = r2;
    }

    cosx = p.sqrt(1 - p.pow(sinx, 2));
    return p.map(r * cosx,0,1,0.55,1);
}