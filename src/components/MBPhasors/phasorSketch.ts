import p5, { Vector } from "p5";
import { Guides } from "../../utils/p5/guides";
import { Phasor } from "../../utils/p5/phasor";

export default function phasorsSketch(p: p5) {
  let guides: Guides;
  let phasorA : Phasor;
  let phasorB : Phasor;
  let phasorSum : Phasor;  

  p.setup = () => {
    p.createCanvas(900, 900);
    guides = new Guides(p);
    guides.addHorizontal(p.height / 2);
    guides.addVertical(p.width / 2);

    let center:Vector = p.createVector(guides.vs[0], guides.hs[0]);

    phasorA = new Phasor(p, p.createVector(-100, -100), p.color(20), center);
    phasorB = new Phasor(p, p.createVector(200, -100), p.color("green"),center);
    phasorSum = new Phasor(p, p.createVector(0, 0), p.color("red"),center);
  };

  p.draw = () => {
    p.clear();
    let mousePos = p.createVector(p.mouseX, p.mouseY);
    p.strokeWeight(1);
    guides.show();

    phasorA.show(mousePos);
    phasorB.show(mousePos);
    if (Phasor.selectedPhasor != null) {
      Phasor.selectedPhasor.setMouseDir(mousePos);
    }
    phasorSum.v = Vector.add(phasorA.v, phasorB.v);
    phasorSum.show(mousePos);
  };



}