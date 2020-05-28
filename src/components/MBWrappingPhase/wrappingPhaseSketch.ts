import { Slider } from '../../utils/p5/slider';
import { Checkbox } from '../../utils/p5/checkbox';
import { Rectangle } from '../../utils/p5/rectangle';
import { Guides } from '../../utils/p5/guides';
import { BezierCurve } from '../../utils/p5/bezier';
import { P5w } from '../../utils/p5w'; // eslint-disable-line no-unused-vars
import { Vector } from 'p5'; // eslint-disable-line no-unused-vars

export default function wrappingPhaseSketch (p: P5w<{}>) {
  let gs: Guides;
  let bezier: BezierCurve;
  let margin;
  let minWraps: number;
  let maxWraps: number;
  let unwrapTime;

  let maxWrapsSlider: Slider;
  let unwrapCheckbox: Checkbox;

  p.setup = () => {
    p.createCanvas(1000, 800);
    createUI();

    calculateWraps();
    margin = 30;
    unwrapTime = 1;

    gs = new Guides(p);
    gs.addHorizontal(margin);
    gs.addHorizontal(p.height - margin);
    gs.addVertical(margin);
    gs.addVertical(p.width - margin);

    bezier = new BezierCurve();
    bezier.createNewPoint(p.createVector(gs.vs[0], (gs.hs[0] + gs.hs[1]) / 2));
    bezier.createNewPoint(
      p.createVector(gs.vs[gs.vs.length - 1] - 20, gs.hs[0])
    );
    bezier.createNewPoint(
      p.createVector(gs.vs[gs.vs.length - 1], gs.hs[0] + 20)
    );
    bezier.createNewPoint(
      p.createVector(gs.vs[gs.vs.length - 1], gs.hs[gs.hs.length - 1])
    );

    bezier.getSegmentPoint(0, 0).interactable = false;
  };

  p.draw = () => {
    // lock X axis to anchor points
    bezier.getSegmentPoint(0, 3).pos.x = gs.vs[gs.vs.length - 1];

    // calculating max wraps
    calculateWraps();
    p.clear();

    p.strokeWeight(1);
    p.stroke(220);
    // border guides
    gs.show();

    // wrap guides
    for (let i = minWraps; i < maxWraps; i++) {
      let hGuide = p.createVector(0, i * 2 * Math.PI);
      hGuide = getCanvasPos(hGuide);
      p.line(gs.vs[0], hGuide.y, gs.vs[gs.vs.length - 1], hGuide.y);
    }

    p.stroke(70);
    const bezierDrawPoints = bezier.getDrawPoints();
    const bezierAnchorPoints = bezier.getAnchorPoints();

    // Unwrapped
    for (let i = 1; i < bezierDrawPoints.length; i++) {
      const A = bezierDrawPoints[i - 1];
      const B = bezierDrawPoints[i];
      p.line(A.x, A.y, B.x, B.y);
    }

    p.stroke(230, 125, 45);
    const lineSeq = splitSequence(bezierDrawPoints);
    for (let i = 0; i < lineSeq.length; i++) {
      const A = lineSeq[i].A;
      const B = lineSeq[i].B;
      const wrap = lineSeq[i].wrap - Math.floor(maxWraps / 2);

      const unwrapTarget = wrap * getWrapHeight();

      A.y += unwrapTarget * unwrapTime;
      B.y += unwrapTarget * unwrapTime;

      p.line(A.x, A.y, B.x, B.y);
    }

    p.stroke(30);
    for (let i = 0; i < bezierAnchorPoints.length; i++) {
      bezierAnchorPoints[i].show(p);
    }

    showUI();
    const targetTime = unwrapCheckbox.value ? 1 : 0;
    unwrapTime = p.lerp(unwrapTime, targetTime, 0.05);
  };

  const calculateWraps = (): void => {
    maxWraps = maxWrapsSlider.getValue();
    minWraps = -maxWraps;
  };

  const getWrapHeight = (): number => {
    return (gs.hs[gs.hs.length - 1] - gs.hs[0]) / maxWraps;
  };

  const splitSequence = (seq: Vector[]) => {
    const lineSeq = [];
    for (let i = 1; i < seq.length; i++) {
      const A = p.createVector(seq[i - 1].x, seq[i - 1].y);
      const B = p.createVector(seq[i].x, seq[i].y);

      const tA = getPlotPos(A);
      const tB = getPlotPos(B);

      const wrapA = Math.floor(tA.y / (2 * Math.PI));
      const wrapB = Math.floor(tB.y / (2 * Math.PI));

      if (wrapA === wrapB) {
        const thisLine = { A: A, B: B, wrap: wrapA };
        lineSeq.push(thisLine);
      } else {
        const maxPoint = Math.max(tA.y, tB.y);
        const wrapMax = Math.floor(maxPoint / (2 * Math.PI));
        const angleIntersect = 2 * Math.PI * wrapMax;
        const plotIntersectY = p.map(angleIntersect, tA.y, tB.y, A.y, B.y);
        const plotIntersectX = p.map(angleIntersect, tA.y, tB.y, A.x, B.x);

        const newB = p.createVector(plotIntersectX, plotIntersectY);
        const lineA = { A: A, B: newB, wrap: wrapA };
        lineSeq.push(lineA);

        const newA = p.createVector(plotIntersectX, plotIntersectY);
        const lineB = { A: newA, B: B, wrap: wrapB };
        lineSeq.push(lineB);
      }
    }
    return lineSeq;
  };

  const getPlotPos = (canvasPos: Vector): Vector => {
    const plotY = p.map(
      canvasPos.y,
      gs.hs[gs.hs.length - 1],
      gs.hs[0],
      0,
      maxWraps * 2 * Math.PI
    );
    return p.createVector(canvasPos.x, plotY);
  };

  const getCanvasPos = (plotPos: Vector): Vector => {
    const canvasY = p.map(
      plotPos.y,
      0,
      maxWraps * 2 * Math.PI,
      gs.hs[gs.hs.length - 1],
      gs.hs[0]
    );
    return p.createVector(plotPos.x, canvasY);
  };

  const createUI = (): void => {
    maxWrapsSlider = new Slider(p, 3, 17, 2);
    maxWrapsSlider.setRectangle(new Rectangle(200, 15, 280, 35));
    maxWrapsSlider.setLabel('Max Wraps: ');
    maxWrapsSlider.setValue(7);

    unwrapCheckbox = new Checkbox(p);
    unwrapCheckbox.setRectangle(new Rectangle(358, 16, 372, 30));
    unwrapCheckbox.setLabel('Unwrap: ');
  };

  const showUI = (): void => {
    maxWrapsSlider.show();
    unwrapCheckbox.show();
  };
}
