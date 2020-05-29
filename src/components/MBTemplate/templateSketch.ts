import { P5w } from '../../utils/p5w'; // eslint-disable-line no-unused-vars

export default function templateSketch (p: P5w) {
  let num : number = 0;
  p.setup = () => {
    p.createCanvas(800, 800);
  };

  p.draw = () => {
    p.clear();
    p.noStroke();
    p.fill(0);
    p.text('test:' + num, 50, 50);
  };

  console.log('Setting up update props');
  p.updateProps = (props : object) => {
    // Where are my props? 😠
    num = props.num;
    // frequency = props.freq;
  };
}
