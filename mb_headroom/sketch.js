
let graphA, graphB, graphSum, guides, phase = 0, decibels, obstacle;
var phaseSlider, periodsSlider, volumeSlider ;
var animationCheckbox;

// jeden signál - sinusovka (čísleně), šum
// husoota šumu
// výpočet rms
// na druhou
// průměr
// odmocnina
// bez animace
// sinusovka vždy v celých násobcích



function setup() {
	createCanvas(800, 550);

	rect = new Rectangle(50,50 , width-50, height-50)
	graphA = new Graph(rect);	
	graphA.setYMinMax(-2,2);
	graphA.setMainColor(color(255,0,0));
	graphB = new Graph(rect);
	graphB.setYMinMax(-2,2);	
	graphB.setMainColor(color(0,0,255));
	graphSum = new Graph(rect);	
	graphSum.setYMinMax(-2,2);
	createSliders();
	createCheckBoxes();
}

function draw() {
	clear();   	 

	stroke(0,0,0,25);
	if(animationCheckbox.getValue()){
		phase += 0.01;
	}

	let resolution = 300;	

	dataA = generateNoise(phase, periodsSlider.getValue(),resolution); 
	dataB = generateSin(phaseSlider.getValue() + phase, periodsSlider.getValue(),resolution);   
	
  	graphA.setData(dataA);
	graphA.show(); 	  
	
	graphB.setData(dataB);	
	graphB.show(); 
	  
	//SUM
	dataSum = [];
	xdataSum = [];
	for(let i = 0; i < dataA.length; i++){
		dataSum[i] = dataA[i] + dataB[i];
		xdataSum[i] = map(i, 0, dataA.length - 1, 0, periodsSlider.getValue() * 2 * PI);		
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
	volumeSlider.show();

	animationCheckbox.show();
}

function createSliders(){
	phaseSlider = new Slider(0, 2*PI);
	phaseSlider.setRectangle(new Rectangle(100,15,180,35));
	phaseSlider.setLabel("Phase: ");

	periodsSlider = new Slider(1, 3);
	periodsSlider.setRectangle(new Rectangle(250,15,330,35));
	periodsSlider.setLabel("Periods: ");

	volumeSlider = new Slider(1, 3);
	volumeSlider.setRectangle(new Rectangle(400,15,480,35));
	volumeSlider.setLabel("Volume: ");
}

function createCheckBoxes(){
	animationCheckbox= new Checkbox();
	animationCheckbox.setRectangle(new Rectangle(558,16, 572, 30));
	animationCheckbox.setLabel('Animation');

	obstacleCheckbox= new Checkbox();
	obstacleCheckbox.setRectangle(new Rectangle(658,16, 672, 30));
	obstacleCheckbox.setLabel('Obstacle');
}

function createXLabels(){
	// let xlabels = [];	
	// let pis = periodsSlider.getValue()*2;
	// for(let i = 0; i <= pis; i++){
	// 	xlabels[i] = {x:i * PI, label: 180 * i  + "°"};		
	// }
	// return xlabels;
}

function createYLabels(){
	let ylabels = [];	
	ylabels[0] = {y:2, label:"6 dB"};
	ylabels[1] = {y:1, label:"0 dB"};
	ylabels[2] = {y:0, label:"-oo dB"};
	ylabels[3] = {y:-1, label:"0"};
	ylabels[4] = {y:-2, label:"6 dB"};	
	return ylabels;
}