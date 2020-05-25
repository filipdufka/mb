import p5, { Vector } from "p5";

export default function mblogoSketch(p: p5) {

  let orderRatio: number = 0;
  let targetOrderRatio: number = 0.98;
  let bWidth: number = 200;
  let lastMousePos: Vector = new Vector();
  let height: number = 250;

  p.setup = () => {
    p.createCanvas(450, 300);
    p.textSize(40);
    p.textAlign(p.CENTER, p.CENTER);
  };

  p.draw = () => {
    p.clear();

    disturb();

    let split = 115;
    let offset = 20;
    orderRatio = p.lerp(orderRatio, targetOrderRatio, 0.005);

    p.translate(p.width / 2, p.height / 2);
    p.translate(-split, 0);
    p.translate(offset, 0);
    drawM();

    p.resetMatrix();
    p.translate(p.width / 2, p.height / 2);
    p.translate(split, 0);
    p.translate(offset, 0);
    drawB();
  };

  const drawM = () => {
    p.strokeWeight(2);

    let verticalLines = 17;
    let mWidth = 200;

    const idealGap = 200 / 17;
    let base = height / 2;

    for (let i = 0; i < verticalLines; i++) {
      let t = i / (verticalLines - 1);
      let cut = mCutout(t);
      let n = p.noise(t * 4, p.millis() * 0.005);
      let y = p.lerp(n, cut, orderRatio);

      let x = p.map(i, 0, verticalLines - 1, -mWidth / 2, mWidth / 2);
      p.line(x, base, x, base - height * y);
    }
  };

  const mCutout = (t: number) => {
    let cleavage = 0.52;
    return p.map(p.abs(t - 0.5), 0, 0.5, cleavage, 1);
  };

  const drawB = () => {
    let horizontalLines = 21;
    let base = -bWidth / 2;
    for (let i = 0; i < horizontalLines; i++) {
      let t = i / (horizontalLines - 1);

      let n = p.noise(t * 3, p.millis() * 0.005);
      let cut = cutoutB(t);
      let x = p.lerp(n, cut, orderRatio);

      let y = p.map(
        i,
        0,
        horizontalLines - 1,
        -height / 2,
        height / 2
      );
      p.strokeWeight(2);
      p.line(base, y, base + bWidth * x, y);
    }
  };

  const cutoutB = (t: number) => {
    let circleRatio = 0.45;
    let r1 = 0.5;
    let r2 = 0.6;

    let d1 = height * circleRatio;
    let d2 = height - d1;
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

    let cosx = p.sqrt(1 - p.pow(sinx, 2));
    return p.map(r * cosx, 0, 1, 0.55, 1);
  };

  const disturb = () => {
    let thisMousePos: Vector = p.createVector(p.mouseX, p.mouseY);
    if (
      p.mouseX >= 0 &&
      p.mouseX <= p.width &&
      p.mouseY >= 0 &&
      p.mouseY <= p.height
    ) {
      let delta = Vector.dist(thisMousePos, lastMousePos);
      if (delta) {
        orderRatio -= 0.001 * delta;
        orderRatio = p.constrain(orderRatio, 0, 1);
      }
    }
    lastMousePos = thisMousePos;
  };


}