import { DraggablePoint } from '../../utils/p5/draggablePoint';
import { P5w } from '../../utils/p5w'; // eslint-disable-line no-unused-vars

interface OmniSourcesProps {
  freq: number;
  numOfOmniSources: number;
  volume : number;
}

export default function omniSourceSketch (p: P5w<OmniSourcesProps>) {
  const omniSourcePositions: DraggablePoint[] = [];
  let numOfOmniSources: number = 2;
  let volume : number = 3;
  let theShader;
  let frequency: number = 81.5 * 4;

  p.preload = () => {
    theShader = p.loadShader('./resources/basic.vert', './resources/omniSources.frag');
  };

  p.setup = () => {
    p.createCanvas(1600, 800, p.WEBGL);
    p.pixelDensity(1);

    let a = p.createVector(p.width/2, p.height/2);
    let o = 150;

    omniSourcePositions.push(new DraggablePoint(p.createVector(a.x-o, a.y)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(a.x+o, a.y)));    
    omniSourcePositions.push(new DraggablePoint(p.createVector(a.x, a.y-o)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(a.x, a.y+o)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(a.x, a.y)));

    p.updateProps = updateProps;
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
    theShader.setUniform('volume', volume);
    theShader.setUniform('frequency', frequency);
    // props.blobMoved(positions);
  };

  const updateProps = (props: OmniSourcesProps) => {
    frequency = props.freq;
    numOfOmniSources = props.numOfOmniSources;
    volume = props.volume;
  };
}
