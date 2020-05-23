import p5, { Vector } from "p5";
import { DraggablePoint } from "../../utils/p5/draggablePoint";
import { circlesIntersection, getNormal } from "../../utils/p5/commonMath";

export default function headDistanceSketch(p: p5) {
  let soundSource: DraggablePoint;
  let gs, headPos, headRadius, earsPos;
  let currentDrawColor;
  let headDiameter: number = 17;
  let magnify;

  p.setup = () => {
    p.createCanvas(900, 900);

    headPos = p.createVector(p.width / 2, p.height / 2);
    headRadius = 50;
    earsPos = {
      left: p.createVector(headPos.x - headRadius, headPos.y),
      right: p.createVector(headPos.x + headRadius, headPos.y),
    };

    soundSource = new DraggablePoint(p.createVector(headPos.x, headPos.y / 2));
    magnify = headDiameter / (2 * headRadius);
    //p.pixelDensity(1);
  };

  p.draw = () => {
    p.clear();

    drawHead();
    drawPath();

    p.stroke(30);
    p.fill(30);
    soundSource.show(p);

    p.fill(200);
    p.noStroke();
    p.textAlign(p.CENTER);
    p.text(headDiameter + " cm", headPos.x, headPos.y + 3);
  };

  const drawLineToCenter = () => {
    p.strokeWeight(1);
    p.stroke(255, 30, 120);
    p.line(
      soundSource.pos.x,
      soundSource.pos.y,
      headPos.x,
      headPos.y
    );
  };

  const getSidePoints = () => {
    let sourceDist = headPos.dist(soundSource.pos);
    let midPos = p.createVector(
      (headPos.x + soundSource.pos.x) / 2,
      (headPos.y + soundSource.pos.y) / 2
    );

    let inters = circlesIntersection(
      p,
      headPos.x,
      headPos.y,
      headRadius,
      midPos.x,
      midPos.y,
      sourceDist / 2
    );
    if (inters != false) {
      return { left: inters[0], right: inters[1] };
    } else {
      let perpendicular = p5.Vector.sub(headPos, soundSource.pos);
      perpendicular.rotate(Math.PI / 2);
      perpendicular.normalize();
      perpendicular.mult(headRadius);
      let leftPos = p.createVector(
        headPos.x - perpendicular.x,
        headPos.y - perpendicular.y
      );
      let rightPos = p.createVector(
        headPos.x + perpendicular.x,
        headPos.y + perpendicular.y
      );
      return { left: leftPos, right: rightPos };
    }
  };

  const drawLineToSides = () => {
    p.strokeWeight(1);
    p.stroke(30, 120, 120);
    let sidePoints = getSidePoints();
    p.line(
      headPos.x,
      headPos.y,
      sidePoints.right.x,
      sidePoints.right.y
    );
    p.line(
      headPos.x,
      headPos.y,
      sidePoints.left.x,
      sidePoints.left.y
    );
    p.line(
      soundSource.pos.x,
      soundSource.pos.y,
      sidePoints.right.x,
      sidePoints.right.y
    );
    p.line(
      soundSource.pos.x,
      soundSource.pos.y,
      sidePoints.left.x,
      sidePoints.left.y
    );
  };

  const drawPath = () => {
    currentDrawColor = p.color(30, 120, 190);
    drawShortestDistance(earsPos.left, earsPos.right);
    currentDrawColor = p.color(190, 30, 120);
    drawShortestDistance(earsPos.right, earsPos.left);
  };

  const drawShortestDistance = (
    earPos: Vector,
    otherEarPos: Vector
  ) => {
    p.stroke(currentDrawColor);

    let sidePoints = getSidePoints();
    let closestSidePoint =
      sidePoints.left.dist(earPos) < sidePoints.right.dist(earPos)
        ? sidePoints.left
        : sidePoints.right;

    p.strokeWeight(6);

    let closestHeadPoint: Vector;
    let distance = 0;

    if (
      earPos.dist(soundSource.pos) <=
      closestSidePoint.dist(soundSource.pos)
    ) {
      // Ear is Close
      closestHeadPoint = earPos;
      distance = closestHeadPoint.dist(soundSource.pos) * magnify;
      p.line(
        earPos.x,
        earPos.y,
        soundSource.pos.x,
        soundSource.pos.y
      );
    } else {
      // Ear is Far
      closestHeadPoint = closestSidePoint;
      p.line(
        closestSidePoint.x,
        closestSidePoint.y,
        soundSource.pos.x,
        soundSource.pos.y
      );

      let closestSideDir = Vector.sub(closestSidePoint, headPos);
      let angleSide = closestSideDir.heading();

      let earDir = Vector.sub(earPos, headPos);
      let angleEar = earDir.heading();

      if (angleEar - angleSide > Math.PI) {
        angleSide = cleanAngle(angleSide);
      }

      //compute distance
      let shadowAngle =
        Math.max(angleSide, angleEar) - Math.min(angleEar, angleSide);
      let shadowDistance = (shadowAngle * headDiameter) / 2;
      distance =
        closestSidePoint.dist(soundSource.pos) * magnify +
        shadowDistance;

      p.noFill();
      p.arc(
        headPos.x,
        headPos.y,
        headRadius * 2,
        headRadius * 2,
        Math.min(angleEar, angleSide),
        Math.max(angleSide, angleEar)
      );
    }
    // Draw Normal
    let midPoint: Vector = p.createVector(
      p.lerp(closestHeadPoint.x, soundSource.pos.x, 0.5),
      p.lerp(closestHeadPoint.y, soundSource.pos.y, 0.5)
    );

    let normal = getNormal(p, closestSidePoint, soundSource.pos).mult(20);
    let side = Math.sign(
      (soundSource.pos.x - closestHeadPoint.x) *
        (otherEarPos.y - closestHeadPoint.y) -
        (soundSource.pos.y - closestHeadPoint.y) *
          (otherEarPos.x - closestHeadPoint.x)
    );
    normal.mult(side);
    //p.line(midPoint.x, midPoint.y, midPoint.x + normal.x, midPoint.y + normal.y);

    // Text draw
    p.noStroke();
    p.fill(currentDrawColor);
    p.textAlign(p.RIGHT);
    if (normal.x > 0) {
      p.textAlign(p.LEFT);
    }

    distance = Math.round(distance * 10) / 10;
    p.text(distance + " cm", midPoint.x + normal.x, midPoint.y + normal.y);
  };

  const drawHead = () => {
    //head
    p.noStroke();
    p.fill(30);
    p.circle(headPos.x, headPos.y, headRadius * 2);
    p.circle(earsPos.left.x, earsPos.left.y, headRadius / 2);
    p.circle(earsPos.right.x, earsPos.right.y, headRadius / 2);
  };

  const cleanAngle = (angle) => {
    while (angle < 0) {
      angle += 2 * Math.PI;
    }
    return angle;
  };
}
