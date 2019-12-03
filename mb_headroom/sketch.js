
let graphA,graphEdited, guides, phase = 0, decibels, obstacle;
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

	rect = new Rectangle(70,50 , width-50, height-50)

	Ymax = 1;
	Ymin = -Ymax;

	graphA = new Graph(rect);	
	graphA.setYMinMax(Ymin, Ymax);
	graphA.setMainColor(color(0,0,0));

	graphEdited = new Graph(rect);
	graphEdited.setYMinMax(Ymin, Ymax);
	graphEdited.setMainColor(color(255,0,0));

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
	let maxValuePos = 0;
	for (let i = 0; i < dataA.length; i++) {
		squared = dataA[i] * dataA[i];
		squared = lerp(dataA[i], squared, squareAnimationTime);
		editedSum += squared;
		dataAedited[i] = squared;
		maxValuePos = Math.abs(dataA[i]) > Math.abs(dataA[maxValuePos]) ? i : maxValuePos;
	}
	
	mean = editedSum / dataA.length;
	for (let i = 0; i < dataAedited.length; i++) {		
		meaned = lerp(dataAedited[i], mean, meanAnimationTime);
		root = rootAnimationTime > 0.0005 ? Math.sqrt(meaned) : meaned;
		rooted = lerp(meaned, root, rootAnimationTime);
		dataAedited[i] = rooted;
	}

	  graphA.setData(dataA);
	  graphEdited.setData(dataAedited);
	  

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
	graphEdited.show();
	graphA.showLabels();	

	stroke(0);
	line(graphEdited.getPosition(0).x - 20, graphEdited.getPosition(0).y, graphEdited.getPosition(0).x - 5, graphEdited.getPosition(0).y);
	line(graphA.border.left, graphA.getPosition(maxValuePos).y, graphA.border.right,   graphA.getPosition(maxValuePos).y);
	noStroke();
	fill(0);
	rmsValue = 20 * Math.log10(Math.abs(graphEdited.getValue(0)));
	text(rmsValue.toFixed(2) + " dBFS", graphEdited.getPosition(0).x, graphEdited.getPosition(0).y - 5);

	peakValue = 20 * Math.log10(Math.abs(graphA.getValue(maxValuePos)));	
	text(peakValue.toFixed(2) + " dBFS",  graphEdited.getPosition(0).x, graphA.getPosition(maxValuePos).y - 5);
	
	//GUI
	periodsSlider.show();
	volumeSlider.show();

	animationCheckbox.show();
	squaredCheckbox.show();
	meanCheckbox.show();
	rootCheckbox.show();
}

function createSliders(){
	periodsSlider = new Slider(1, 3, 1);
	periodsSlider.setRectangle(new Rectangle(150,15,230,35));
	periodsSlider.setLabel("Zoom: ");

	volumeSlider = new Slider(0.5, 2);
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
	let xlabels = [];	
	return xlabels;
}

function createYLabels(){
	let ylabels = [];		
	ylabels[0] = {y:1, label:"0 dBFS"};
	ylabels[1] = {y:0, label:"-oo dBFS"};
	ylabels[2] = {y:-1, label:"0 dBFS"};
	return ylabels;
}