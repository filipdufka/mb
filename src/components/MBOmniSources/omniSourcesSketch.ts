import p5, { Vector } from "p5";
import { DraggablePoint } from "../../utils/p5/draggablePoint";

export default function omniSourceSketch(p: p5) {
  let omniSourcePositions : DraggablePoint[] = [];
  let numOfOmniSources: number = 5;
  let theShader;

  p.preload = () => {
    theShader = p.loadShader('./resources/basic.vert', './resources/omniSources.frag');
  }

  p.setup = () => {
      p.createCanvas(800, 800, p.WEBGL);

      omniSourcePositions.push(new DraggablePoint(p.createVector(350.0, 400.0)));
      omniSourcePositions.push(new DraggablePoint(p.createVector(450.0, 400.0)));
      omniSourcePositions.push(new DraggablePoint(p.createVector(400.0, 800.0)));
      omniSourcePositions.push(new DraggablePoint(p.createVector(450.0, 800.0)));
      omniSourcePositions.push(new DraggablePoint(p.createVector(500.0, 800.0)));
  };

  p.draw = () => {
      p.clear();

      p.shader(theShader);
      p.rect(0, 0, p.width, p.height);

      p.stroke(120,50,255);  
      p.translate(-p.width/2, -p.height/2);
      for (let s = 0; s < omniSourcePositions.length; s++) {
        const element = omniSourcePositions[s];
        if(s < numOfOmniSources){
          omniSourcePositions[s].pos.x = Math.abs(omniSourcePositions[s].pos.x); 
          element.show(p);
          p.fill(20);
          p.circle(element.pos.x, element.pos.y, 20);
        }else{
          omniSourcePositions[s].pos.x = -Math.abs(omniSourcePositions[s].pos.x); 
        }
      }
      let positions : number[] = [];
      omniSourcePositions.map((os) => {positions.push(os.pos.x);positions.push(os.pos.y);});
      theShader.setUniform('locations', positions);
      theShader.setUniform('res', [p.width, p.height]);
      theShader.setUniform('scale', 30);
      theShader.setUniform('volume', 3);
      theShader.setUniform('frequency', 81.5*4);
      //props.blobMoved(positions);
  }

}