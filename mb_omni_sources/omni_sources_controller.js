let numOfOmniSources = 1;
let omniSourceVolume = 0;
let omniSourceFrequency = 20;

var omni_sources_controller = function(p){
  p.setup = function(){
    var cnvs = p.createCanvas(800, 50); 
    cnvs.parent('controllPanel');

    p.createSliders();

    console.log(1 / Math.log(10));
  }

  p.draw = function(){
    p.clear();

    p.sourceCountSlider.show(p);
    p.volumeSlider.show(p);
    p.frequencySlider.show(p);

    numOfOmniSources = p.sourceCountSlider.getValue();
    omniSourceVolume = p.lerp(omniSourceVolume, p.volumeSlider.getValue(), 0.08);
    omniSourceFrequency = p.lerp(omniSourceFrequency, p.frequencySlider.getValue(), 0.08);
  }

  p.createSliders = function(){
    p.sourceCountSlider = new Slider(p, 1, 5, 1);
    p.sourceCountSlider.setRectangle(new Rectangle(100,15,180,35));
    p.sourceCountSlider.setLabel("N of Sources: ");

    p.volumeSlider = new Slider(p, 0, 15, 0.0001);
    p.volumeSlider.setRectangle(new Rectangle(300,15,380,35));
    p.volumeSlider.setLabel("Volume of Sources: ");
    p.volumeSlider.setValue(3);

    p.frequencySlider = new Slider(p, 20, 500, 5);
    p.frequencySlider.setRectangle(new Rectangle(500,15,580,35));
    p.frequencySlider.setLabel("Frequency: ");
  }
}

var p5osc = new p5(omni_sources_controller);