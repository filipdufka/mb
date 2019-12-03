
let graphA,graphCurrentOperation, guides, phase = 0, decibels, obstacle;
var periodsSlider, volumeSlider ;
var animationCheckbox, squaredCheckbox, meanCheckbox;
var squareAnimationTime = 0, meanAnimationTime = 0, rootAnimationTime = 0;
var squareTarget, meanTarget, rootTarget;

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

	Ymax = 2;
	Ymin = -Ymax;

	graphA = new Graph(rect);	
	graphA.setYMinMax(Ymin, Ymax);
	graphA.setMainColor(color(0,0,0));
	graphCurrentOperation = new Graph(rect);
	graphCurrentOperation.setYMinMax(Ymin, Ymax);
	graphCurrentOperation.setMainColor(color(255,0,0));

	createSliders();
	createCheckBoxes();
}

function draw() {
	clear();   	 

	stroke(0,0,0,25);
	if(animationCheckbox.getValue()){
		phase += 0.01;
	}

	// get operation
	squareTarget = squaredCheckbox.getValue() ? 1 : 0;
	meanTarget = meanCheckbox.getValue() ? 1 : 0;
	rootTarget = rootCheckbox.getValue() ? 1 : 0;

	squareAnimationTime = lerp(squareAnimationTime, squareTarget, 0.05);
	meanAnimationTime = lerp(meanAnimationTime, meanTarget, 0.05);
	rootAnimationTime = lerp(rootAnimationTime, rootTarget, 0.05);

	let resolution = 300;	

	dataA = generateNoise(phase, periodsSlider.getValue(),resolution, volumeSlider.getValue()); 	
	let dataAedited = []; 
	let editedSum = 0; 
	for (let i = 0; i < dataA.length; i++) {
		squared = dataA[i] * dataA[i];
		squared = lerp(dataA[i], squared, squareAnimationTime);
		editedSum += squared;
		dataAedited[i] = squared;
	}

	mean = editedSum / dataA.length;
	for (let i = 0; i < dataAedited.length; i++) {		
		meaned = lerp(dataAedited[i], mean, meanAnimationTime);
		root = rootAnimationTime > 0.0005 ? Math.sqrt(meaned) : meaned;
		dataAedited[i] = lerp(meaned, root, rootAnimationTime);
	}

	  graphA.setData(dataA);
	  graphCurrentOperation.setData(dataAedited);
	  

	xdataA = [];
	for(let i = 0; i < dataA.length; i++){
		xdataA[i] = map(i, 0, dataA.length - 1, 0, periodsSlider.getValue() * 2 * PI);		
	}

	xlabels = createXLabels();
	ylabels = createYLabels();
	
	graphA.setXData(xdataA);
	graphA.setXLabels(xlabels);
	graphA.setYLabels(ylabels);

	graphA.show(); 
	graphCurrentOperation.show();
	graphA.showLabels();

	periodsSlider.show();
	volumeSlider.show();

	animationCheckbox.show();
	squaredCheckbox.show();
	meanCheckbox.show();
	rootCheckbox.show();
}

function createSliders(){
	periodsSlider = new Slider(1, 3);
	periodsSlider.setRectangle(new Rectangle(150,15,230,35));
	periodsSlider.setLabel("Periods: ");

	volumeSlider = new Slider(0.5, 5);
	volumeSlider.setRectangle(new Rectangle(300,15,380,35));
	volumeSlider.setLabel("Volume: ");
	volumeSlider.setValue(1);
}

function createCheckBoxes(){
	animationCheckbox= new Checkbox();
	animationCheckbox.setRectangle(new Rectangle(400,16, 414, 30));
	animationCheckbox.setLabel('Animation');

	squaredCheckbox= new Checkbox();
	squaredCheckbox.setRectangle(new Rectangle(500,16, 514, 30));
	squaredCheckbox.setLabel('Square');

	meanCheckbox= new Checkbox();
	meanCheckbox.setRectangle(new Rectangle(600,16, 614, 30));
	meanCheckbox.setLabel('Mean');

	rootCheckbox= new Checkbox();
	rootCheckbox.setRectangle(new Rectangle(700,16, 714, 30));
	rootCheckbox.setLabel('Root');
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