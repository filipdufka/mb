function drawLogo(){

}

function drawM(){
// verticals

    strokeWeight(2);
    
    let verticalLines = 17;
    let mWidth = 200;
    let mHeight = 250;  
    let base = mHeight/2;
    
    for(let i = 0; i < verticalLines; i++){
    let t = i / (verticalLines - 1);
    let cut = mCutout(t);  
    let n = noise(t * 4, millis() * 0.005);
    let y = lerp (n, cut, orderRatio);
    
    let x = map(i, 0, verticalLines - 1, - mWidth/2, mWidth/2);
    line(x, base , x, base - mHeight * y);
    }
}

function mCutout(t){
    let cleavage = 0.52;
    return map(abs(t - 0.5),0, 0.5, cleavage,1);
}

// horizontals
let horizontalLines = 21;
let circleRatio = 0.45;
let r1 = 0.5;
let r2 = 0.6;
let bWidth = 200;
let bHeight = 250;
let base = -bWidth/2;

function drawB() {
  for (let i = 0; i < horizontalLines; i++) {
    let t = i / (horizontalLines - 1);
    
    let n = noise(t * 3, millis() * 0.005);
    let cut = cutoutB(t);
    let x = lerp (n, cut, orderRatio);
    
    let y = map(i, 0, horizontalLines - 1, -bHeight / 2, bHeight / 2);
    strokeWeight(2);
    line(base, y, base + bWidth * x, y);
  }
}

function cutoutB(t) {
    let d1 = bHeight * circleRatio;
    let d2 = bHeight - d1;
    let x = bWidth / 2;

    let t1 = norm(t, 0, circleRatio);
    let t2 = norm(t, circleRatio, 1);
    let r = r1;
    let sinx = 0;
    if (t < circleRatio) {
      sinx = 2 * abs(t1 - 0.5);
    } else {
      sinx = 2 * abs(t2 - 0.5);
      r = r2;
    }

    cosx = sqrt(1 - pow(sinx, 2));
    return map(r * cosx,0,1,0.55,1);
}