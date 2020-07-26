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
  let targetVolume : number = 3;
  let theShader;
  let frequency: number = 81.5 * 4;
  let targetFrequency : number = 81.5 * 4;

  let overlay = p.createGraphics(800,800);
  let wgl = p.createGraphics(800,800,p.WEBGL);

  p.preload = () => {
    p.updateProps = updateProps;
    p.resize = resize;
    theShader = p.loadShader('./resources/basic.vert', './resources/omniSources.frag');
  };

  p.setup = () => {
    p.createCanvas(800, 800);

    //p.pixelDensity(1);
    wgl.pixelDensity(1);

    let a = p.createVector(p.width / 2, p.height / 2);
    let o = 150;

    omniSourcePositions.push(new DraggablePoint(p.createVector(a.x-o, a.y)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(a.x+o, a.y)));    
    omniSourcePositions.push(new DraggablePoint(p.createVector(a.x, a.y-o)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(a.x, a.y+o)));
    omniSourcePositions.push(new DraggablePoint(p.createVector(a.x, a.y)));
  };

  p.draw = () => {
    p.clear();
    overlay.clear();

    frequency = p.lerp(frequency, targetFrequency, 0.07);
    volume = p.lerp(volume, targetVolume, 0.1);

    wgl.shader(theShader);
    wgl.rect(0, 0, p.width, p.height);

    // overlay.stroke(120, 50, 255);    
    for (let s = 0; s < omniSourcePositions.length; s++) {
      const element = omniSourcePositions[s];
      if (s < numOfOmniSources) {
        element.show(p);
        overlay.fill(240);
        overlay.circle(element.pos.x, element.pos.y, 20);
      }
    }
    const positions: number[] = [];
    omniSourcePositions.map((os) => { positions.push(os.pos.x); positions.push(os.pos.y); });
    theShader.setUniform('locations', positions);
    theShader.setUniform('res', [p.width, p.height]);
    theShader.setUniform('scale', 30);
    theShader.setUniform('volume', volume);
    theShader.setUniform('frequency', frequency);
    const n = numOfOmniSources;
    theShader.setUniform('visibility', [n > 0,n > 1,n > 2,n > 3,n > 4]);
    // props.blobMoved(positions);

    p.image(wgl,0,0);
    p.image(overlay, 0,0);
  };

  const updateProps = (props: OmniSourcesProps) => {
    targetFrequency = props.freq;
    numOfOmniSources = props.numOfOmniSources;
    targetVolume = props.volume;
  };

  const resize = (width: number, height: number) => {
    const prevCenter = p.createVector(p.width / 2, p.height / 2);
    p.resizeCanvas(width, height);
    overlay.resizeCanvas(width, height);
    wgl.resizeCanvas(width, height);
    const newCenter = p.createVector(p.width / 2, p.height / 2);

    omniSourcePositions.forEach(element => {
      const offset = p.createVector(element.pos.x - prevCenter.x, element.pos.y - prevCenter.y);
      element.pos = p.createVector(newCenter.x + offset.x, newCenter.y + offset.y);
    });
  };
}
