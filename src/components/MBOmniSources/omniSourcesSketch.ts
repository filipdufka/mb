import { DraggablePoint } from '../../utils/p5/draggablePoint';
import { P5w } from '../../utils/p5w'; // eslint-disable-line no-unused-vars

interface OmniSourcesProps {
  freq: number;
}

export default function omniSourceSketch (p: P5w) {
  const omniSourcePositions: DraggablePoint[] = [];
  const numOfOmniSources: number = 5;
  let theShader;
  const frequency : number = 20;

  p.preload = () => {
    theShader = p.loadShader('./resources/basic.vert', './resources/omniSources.frag');
  };

  p.setup = () => {
    p.createCanvas(800, 800, p.WEBGL);

    omniSourcePositions.push(new DraggablePoint(p.createVector(350.0, 400.0)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(450.0, 400.0)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(400.0, 800.0)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(450.0, 800.0)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(500.0, 800.0)));

    console.log(p);
  };

  p.draw = () => {
    p.clear();

    p.shader(theShader);
    p.rect(0, 0, p.width, p.height);

    p.stroke(120, 50, 255);
    p.translate(-p.width / 2, -p.height / 2);
    for (let s = 0; s < omniSourcePositions.length; s++) {
      const element = omniSourcePositions[s];
      if (s < numOfOmniSources) {
        omniSourcePositions[s].pos.x = Math.abs(omniSourcePositions[s].pos.x);
        element.show(p);
        p.fill(20);
        p.circle(element.pos.x, element.pos.y, 20);
      } else {
        omniSourcePositions[s].pos.x = -Math.abs(omniSourcePositions[s].pos.x);
      }
    }
    const positions: number[] = [];
    omniSourcePositions.map((os) => { positions.push(os.pos.x); positions.push(os.pos.y); });
    theShader.setUniform('locations', positions);
    theShader.setUniform('res', [p.width, p.height]);
    theShader.setUniform('scale', 30);
    theShader.setUniform('volume', 3);
    theShader.setUniform('frequency', frequency);
    // props.blobMoved(positions);
  };

  p.updateProps = (props: OmniSourcesProps) => {
    console.log('Update freqs');
    frequency = props.freq;
  };
}
