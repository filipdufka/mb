import p5 from "p5";
import { Checkbox } from "../../utils/p5/checkbox";
import { Slider } from "../../utils/p5/slider";
import { Graph } from "../../utils/p5/graph";
import { Rectangle } from "../../utils/p5/rectangle";
import { generateNoise } from "../../utils/p5/signal_generator";

export default function headroomSketch(p: p5) {
  let graphA: Graph;
    let graphEdited: Graph;
    let periodsSlider : Slider;
    let volumeSlider : Slider;
    let animationCheckbox : Checkbox;
    let squaredCheckbox : Checkbox;
    let meanCheckbox : Checkbox;
    let rootCheckbox : Checkbox;
    let phase : number = 0.0;
    let squareAnimationTime : number = 0.0;
    let meanAnimationTime : number = 0.0;
    let rootAnimationTime : number = 0.0;
  
    p.setup = () => {
      p.createCanvas(800, 550);
  
      let rect = new Rectangle(70, 50, p.width - 50, p.height - 50);
  
      let Ymax = 1;
      let Ymin = -Ymax;
  
      graphA = new Graph(p, rect);
      graphA.setYMinMax(Ymin, Ymax);
      graphA.setMainColor(p.color(0, 0, 0));
  
      graphEdited = new Graph(p, rect);
      graphEdited.setYMinMax(Ymin, Ymax);
      graphEdited.setMainColor(p.color(255, 0, 0));
  
      createSliders();
      createCheckBoxes();
    };
  
    p.draw = () => {
      p.clear();
  
      p.stroke(0, 0, 0, 25);
      if (animationCheckbox.getValue()) {
        phase += 0.01;
      }
  
      // get operation
      let squareTarget = squaredCheckbox.getValue() ? 1 : 0;
      let meanTarget = meanCheckbox.getValue() ? 1 : 0;
      let rootTarget = rootCheckbox.getValue() ? 1 : 0;
  
      squareAnimationTime = p.lerp(squareAnimationTime, squareTarget, 0.05);
      meanAnimationTime = p.lerp(meanAnimationTime, meanTarget, 0.05);
      rootAnimationTime = p.lerp(rootAnimationTime, rootTarget, 0.05);
  
      let resolution = 300;
  
      let dataA = generateNoise(
        p,
        phase,
        periodsSlider.getValue(),
        resolution,
        volumeSlider.getValue()
      );
      let dataAedited = [];
      let editedSum = 0;
      let maxValuePos = 0;
      for (let i = 0; i < dataA.length; i++) {
        let squared = dataA[i] * dataA[i];
        squared = p.lerp(dataA[i], squared, squareAnimationTime);
        editedSum += squared;
        dataAedited[i] = squared;
        maxValuePos =
          Math.abs(dataA[i]) > Math.abs(dataA[maxValuePos]) ? i : maxValuePos;
      }
  
      let mean = editedSum / dataA.length;
      for (let i = 0; i < dataAedited.length; i++) {
        let meaned = p.lerp(dataAedited[i], mean, meanAnimationTime);
        let root = rootAnimationTime > 0.0005 ? Math.sqrt(meaned) : meaned;
        let rooted = p.lerp(meaned, root, rootAnimationTime);
        dataAedited[i] = rooted;
      }
  
      graphA.setData(dataA);
      graphEdited.setData(dataAedited);
  
      let xdataA = [];
      for (let i = 0; i < dataA.length; i++) {
        xdataA[i] = p.map(
          i,
          0,
          dataA.length - 1,
          0,
          periodsSlider.getValue() * 2 * Math.PI
        );
      }
  
      let xlabels = createXLabels();
      let ylabels = createYLabels();
  
      graphA.setXData(xdataA);
      graphA.setXLabels(xlabels);
      graphA.setYLabels(ylabels);
  
      graphA.show();
      graphEdited.show();
      graphA.showLabels();
  
      p.stroke(0);
      p.line(
        graphEdited.getPosition(0).x - 20,
        graphEdited.getPosition(0).y,
        graphEdited.getPosition(0).x - 5,
        graphEdited.getPosition(0).y
      );
      p.line(
          graphA.border.left,
          graphA.getPosition(maxValuePos).y,
          graphA.border.right,
          graphA.getPosition(maxValuePos).y
      );
      p.noStroke();
      p.fill(0);
      let rmsValue = 20 * Math.log10(Math.abs(graphEdited.getValue(0)));
      p.text(
        rmsValue.toFixed(2) + " dBFS",
        graphEdited.getPosition(0).x,
        graphEdited.getPosition(0).y - 5
      );
  
      let peakValue = 20 * Math.log10(Math.abs(graphA.getValue(maxValuePos)));
      p.text(
        peakValue.toFixed(2) + " dBFS",
        graphEdited.getPosition(0).x,
        graphA.getPosition(maxValuePos).y - 5
      );
  
      //GUI
      periodsSlider.show();
      volumeSlider.show();
  
      animationCheckbox.show();
      squaredCheckbox.show();
      meanCheckbox.show();
      rootCheckbox.show();
    };

  
    const createSliders = () => {
      periodsSlider = new Slider(p, 1, 3, 1);
      periodsSlider.setRectangle(new Rectangle(150, 15, 230, 35));
      periodsSlider.setLabel("Zoom: ");
  
      volumeSlider = new Slider(p, 0.5, 2);
      volumeSlider.setRectangle(new Rectangle(300, 15, 380, 35));
      volumeSlider.setLabel("Volume: ");
      volumeSlider.setValue(1);
    };
  
    const createCheckBoxes = () => {
      animationCheckbox = new Checkbox(p);
      animationCheckbox.setRectangle(new Rectangle(400, 16, 414, 30));
      animationCheckbox.setLabel("Animation");
  
      squaredCheckbox = new Checkbox(p);
      squaredCheckbox.setRectangle(new Rectangle(500, 16, 514, 30));
      squaredCheckbox.setLabel("Square");
  
      meanCheckbox = new Checkbox(p);
      meanCheckbox.setRectangle(new Rectangle(600, 16, 614, 30));
      meanCheckbox.setLabel("Mean");
  
      rootCheckbox = new Checkbox(p);
      rootCheckbox.setRectangle(new Rectangle(700, 16, 714, 30));
      rootCheckbox.setLabel("Root");
    };
  
    const createXLabels = () => {
      let xlabels = [];
      return xlabels;
    };
  
    const createYLabels = () => {
      let ylabels = [];
      ylabels[0] = { y: 1, label: "0 dBFS" };
      ylabels[1] = { y: 0, label: "-oo dBFS" };
      ylabels[2] = { y: -1, label: "0 dBFS" };
      return ylabels;
    };


}