var omnni_sources_controller = function(p){
  p.setup = function(){
    var cnvs = p.createCanvas(800, 50); 
    cnvs.parent('controllPanel');

    p.createSliders();
  }

  p.draw = function(){
    p.clear();

    p.phaseSlider.show(p);
  }

  p.createSliders = function(){
    p.phaseSlider = new Slider(p, 1, 5, 1);
    p.phaseSlider.setRectangle(new Rectangle(100,15,180,35));
    p.phaseSlider.setLabel("N of Sources: ");
  }
}

var p5canvas = new p5(omnni_sources_controller);