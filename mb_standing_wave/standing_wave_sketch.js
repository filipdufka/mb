var standing_wave_sketch = function(p){
let graphA, graphB, graphSum, guides, phase = 0, decibels, obstacle;
var phaseSlider, periodsSlider, testSlider;
var degreesCheckbox, decibelsCheckbox, animationCheckbox, obstacleCheckbox;

// volná konec, mělo by to být naopak

// udělat další script pro stojaté vlnění (volná a pevná)
// https://www.walter-fendt.de/html5/phen/standingwavereflection_en.htm + inversse square law
// grid i 90°, pokud by šlo, tak i 45°
// červená součet, o pixel tlustčí
// + vznik - inverse square law

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
	if(animationCheckbox.getValue()){
		phase += 0.01;
	}

	let resolution = 300;	

	dataA = generateSin(phase, periodsSlider.getValue(),resolution); 
	dataB = generateSin(phaseSlider.getValue() + phase, periodsSlider.getValue(),resolution);   

	if(obstacleCheckbox.getValue()){
		dataStandingWave = generateSin(phaseSlider.getValue() + phase, periodsSlider.getValue() * 2,resolution * 2);  
		dataA = dataStandingWave.slice(0,resolution);
		dataB = dataStandingWave.slice(resolution).reverse();
		p.strokeWeight(8);
		p.line(graphSum.border.right,graphSum.border.top,graphSum.border.right,graphSum.border.bottom );
	}
	
  	graphA.setData(dataA);
	graphA.show(); 	  
	
	graphB.setData(dataB);	
	graphB.show(); 
	  
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
	phaseSlider = new Slider(p, 0, 2*Math.PI);
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

var p5canvas = new p5(standing_wave_sketch);