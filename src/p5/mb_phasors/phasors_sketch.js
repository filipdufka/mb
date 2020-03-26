var phasors_sketch = function(p) {
  let phasorA, phasorB, phasorSum;
  let guides, mousePos;
  let selectedPhasor;

  // ✔ ❌
  // textbox úhlů, textbox magnitude ❌
  // checkbox lock magnitude per phasor ❌
  // fix max magnitude (0 - 1)¨ ❌
  // červená součet, o pixel tlustčí ❌
  // spojit s mb_sin_add - tedy dvě sinusovky s fázema❌

  p.setup = function() {
    p.createCanvas(900, 900);
    guides = new Guides(p);
    guides.addHorizontal(p.height / 2);
    guides.addVertical(p.width / 2);

    phasorA = new Phasor(p, p.createVector(-100, -100), "darkblue");
    phasorB = new Phasor(p, p.createVector(200, -100), "red");
    phasorSum = new Phasor(p, p.createVector(0, 0), "green");
  };

  p.draw = function() {
    p.clear();
    mousePos = p.createVector(p.mouseX, p.mouseY);
    p.strokeWeight(1);
    guides.show();

    phasorA.show();
    phasorB.show();
    if (selectedPhasor != null) {
      selectedPhasor.setMouseDir();
    }
    phasorSum.v = p5.Vector.add(phasorA.v, phasorB.v);
    phasorSum.show();
  };

  class Phasor {
    constructor(p, v, col) {
      this.v = v;
      this.col = col;
      this.center = new p5.Vector(guides.vs[0], guides.hs[0]);
      this.hover = false;
      this.p = p;
    }

    show() {
      this.getHover();

      drawArrow(
        p,
        this.center,
        this.getEnd(),
        this.hover ? p.color(125, 200, 255) : this.col
      );
    }

    getEnd() {
      return p5.Vector.add(this.center, this.v);
    }

    setMouseDir() {
      this.v = p5.Vector.sub(mousePos, this.center);
      if (this.v.mag() < 30) {
        this.v.setMag(30);
      }
    }

    getHover() {
      let dist = distToSegment(mousePos, this.center, this.getEnd());

      if (dist < 5 && this.hover == false && selectedPhasor == null) {
        this.hover = true;
        if (this.p.mouseIsPressed) {
          selectedPhasor = this;
        }
      } else {
        this.hover = false;
      }
      if (this.p.mouseIsPressed == false) {
        selectedPhasor = null;
      }
    }
  }
};

var phasors_sketch_canvas = new p5(phasors_sketch);


var sin_add_sketch = function(p){
	let graphA, graphB, graphSum, guides, phase = 0, decibels, obstacle;
	var phaseSlider, periodsSlider, testSlider;
	var degreesCheckbox, decibelsCheckbox, animationCheckbox, obstacleCheckbox;
	
	// ✔ ❌
	// volný konec, mělo by to být naopak ❌
	
	// udělat další script pro stojaté vlnění (volná a pevná) ❌
	// https://www.walter-fendt.de/html5/phen/standingwavereflection_en.htm + ❌
	// grid i 90°, pokud by šlo, tak i 45° ❌
	// červená součet, o pixel tlustčí ❌
	// + vznik -  ❌
	
	p.setup = function() {
		p.createCanvas(800, 550);
	
		rect = new Rectangle(50,50 , p.width-50, p.height-50)
		graphA = new Graph(p, rect);	
		graphA.setYMinMax(-2,2);
		graphA.setMainColor(p.color(255,0,0));
		graphB = new Graph(p, rect);
		graphB.setYMinMax(-2,2);	
		graphB.setMainColor(p.color(0,0,255));
		graphSum = new Graph(p, rect);	
		graphSum.setYMinMax(-2,2);
		createSliders();
		createCheckBoxes();
	}
	
	p.draw = function() {
		p.clear();   	 
	
		p.stroke(0,0,0,25);
		if(animationCheckbox.getValue(p)){
			phase += 0.01;
		}
	
		let resolution = 300;	
	
		dataA = generateSin(phase, periodsSlider.getValue(p),resolution); 
		dataB = generateSin(phaseSlider.getValue(p) + phase, periodsSlider.getValue(p),resolution);   
	
		if(obstacleCheckbox.getValue(p)){
			dataStandingWave = generateSin(phaseSlider.getValue(p) + phase, periodsSlider.getValue() * 2,resolution * 2);  
			dataA = dataStandingWave.slice(0,resolution);
			dataB = dataStandingWave.slice(resolution).reverse();
			p.strokeWeight(8);
			p.line(graphSum.border.right,graphSum.border.top,graphSum.border.right,graphSum.border.bottom );
		}
		
		graphA.setData(dataA);
		graphA.show(p); 	  
		
		graphB.setData(dataB);	
		graphB.show(p); 
		  
		//SUM
		dataSum = [];
		xdataSum = [];
		for(let i = 0; i < dataA.length; i++){
			dataSum[i] = dataA[i] + dataB[i];
			xdataSum[i] = p.map(i, 0, dataA.length - 1, 0, periodsSlider.getValue() * 2 * Math.PI);		
		}
	
		xlabels = createXLabels();
		ylabels = createYLabels();
		
		graphSum.setData(dataSum);
		graphSum.setXData(xdataSum);
		graphSum.setXLabels(xlabels);
		graphSum.setYLabels(ylabels);
	
		graphSum.show(); 
		graphSum.showLabels();
	
		phaseSlider.show();
		periodsSlider.show();
	
		degreesCheckbox.show();
		decibelsCheckbox.show();
		animationCheckbox.show();
		obstacleCheckbox.show();
	}
	
	function createSliders(){
		phaseSlider = new Slider(p, 0, 2*p.PI);
		phaseSlider.setRectangle(new Rectangle(100,15,180,35));
		phaseSlider.setLabel("Phase: ");
	
		periodsSlider = new Slider(p, 1, 3);
		periodsSlider.setRectangle(new Rectangle(250,15,330,35));
		periodsSlider.setLabel("Periods: ");
	}
	
	function createCheckBoxes(){
		degreesCheckbox = new Checkbox(p);
		degreesCheckbox.setRectangle(new Rectangle(358,16, 372, 30));
		degreesCheckbox.setLabel('Degrees');
	
		decibelsCheckbox = new Checkbox(p);
		decibelsCheckbox.setRectangle(new Rectangle(458,16, 472, 30));
		decibelsCheckbox.setLabel('Decibels');
	
		animationCheckbox= new Checkbox(p);
		animationCheckbox.setRectangle(new Rectangle(558,16, 572, 30));
		animationCheckbox.setLabel('Animation');
	
		obstacleCheckbox= new Checkbox(p);
		obstacleCheckbox.setRectangle(new Rectangle(658,16, 672, 30));
		obstacleCheckbox.setLabel('Obstacle');
	}
	
	function createXLabels(){
		let xlabels = [];	
		let pis = periodsSlider.getValue()*2;
		for(let i = 0; i <= pis; i++){
			if(degreesCheckbox.getValue()){
				xlabels[i] = {x:i * Math.PI, label: 180 * i  + "°"};
			}else{
				let label;
				if(i === 0){
					label = "0";
				}else if(i === 1){
					label = "π";
				}else{
					label = i + "π";
				}
				xlabels[i] = {x:i * Math.PI, label: label};
			}
		}
		return xlabels;
	}
	
	function createYLabels(){
		let ylabels = [];	
		if(decibelsCheckbox.getValue()){
			ylabels[0] = {y:2, label:"6 dB"};
			ylabels[1] = {y:1, label:"0 dB"};
			ylabels[2] = {y:0, label:"-oo dB"};
			ylabels[3] = {y:-1, label:"0"};
			ylabels[4] = {y:-2, label:"6 dB"};
		}else{	
			ylabels[0] = {y:2, label:"2"};
			ylabels[1] = {y:1, label:"1"};
			ylabels[2] = {y:0, label:"0"};
			ylabels[3] = {y:-1, label:"-1"};
			ylabels[4] = {y:-2, label:"-2"};
		}
		return ylabels;
	}
}

var sin_add_sketch_canvas = new p5(sin_add_sketch);
