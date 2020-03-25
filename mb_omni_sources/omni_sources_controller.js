let numOfOmniSources = 1;

var omni_sources_controller = function(p){
  p.setup = function(){
    var cnvs = p.createCanvas(800, 50); 
    cnvs.parent('controllPanel');

    p.createSliders();
  }

  p.draw = function(){
    p.clear();

    p.sourceCountSlider.show(p);
    numOfOmniSources = p.sourceCountSlider.getValue();
  }

  p.createSliders = function(){
    p.sourceCountSlider = new Slider(p, 1, 5, 1);
    p.sourceCountSlider.setRectangle(new Rectangle(100,15,180,35));
    p.sourceCountSlider.setLabel("N of Sources: ");
  }
}

var p5osc = new p5(omni_sources_controller);