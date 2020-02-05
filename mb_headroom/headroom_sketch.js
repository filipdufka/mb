var headroom_sketch = function(p){
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



p.setup = function() {
	p.createCanvas(800, 550);

	rect = new Rectangle(70,50 , p.width-50, p.height-50)

	Ymax = 1;
	Ymin = -Ymax;

	graphA = new Graph(p, rect);	
	graphA.setYMinMax(Ymin, Ymax);
	graphA.setMainColor(p.color(0,0,0));

	graphEdited = new Graph(p, rect);
	graphEdited.setYMinMax(Ymin, Ymax);
	graphEdited.setMainColor(p.color(255,0,0));

	p.createSliders();
	p.createCheckBoxes();
}

p.draw = function() {
	p.clear();   	 

	p.stroke(0,0,0,25);
	if(animationCheckbox.getValue()){
		phase += 0.01;
	}

	// get operation
	squareTarget = squaredCheckbox.getValue() ? 1 : 0;
	meanTarget = meanCheckbox.getValue() ? 1 : 0;
	rootTarget = rootCheckbox.getValue() ? 1 : 0;

	squareAnimationTime = p.lerp(squareAnimationTime, squareTarget, 0.05);
	meanAnimationTime = p.lerp(meanAnimationTime, meanTarget, 0.05);
	rootAnimationTime = p.lerp(rootAnimationTime, rootTarget, 0.05);

	let resolution = 300;	

	dataA = generateNoise(p, phase, periodsSlider.getValue(),resolution, volumeSlider.getValue()); 	
	let dataAedited = []; 
	let editedSum = 0; 
	let maxValuePos = 0;
	for (let i = 0; i < dataA.length; i++) {
		squared = dataA[i] * dataA[i];
		squared = p.lerp(dataA[i], squared, squareAnimationTime);
		editedSum += squared;
		dataAedited[i] = squared;
		maxValuePos = Math.abs(dataA[i]) > Math.abs(dataA[maxValuePos]) ? i : maxValuePos;
	}
	
	mean = editedSum / dataA.length;
	for (let i = 0; i < dataAedited.length; i++) {		
		meaned = p.lerp(dataAedited[i], mean, meanAnimationTime);
		root = rootAnimationTime > 0.0005 ? Math.sqrt(meaned) : meaned;
		rooted = p.lerp(meaned, root, rootAnimationTime);
		dataAedited[i] = rooted;
	}

	  graphA.setData(dataA);
	  graphEdited.setData(dataAedited);
	  

	xdataA = [];
	for(let i = 0; i < dataA.length; i++){
		xdataA[i] = p.map(i, 0, dataA.length - 1, 0, periodsSlider.getValue() * 2 * Math.PI);				
	}

	xlabels = p.createXLabels();
	ylabels = p.createYLabels();
	
	graphA.setXData(xdataA);
	graphA.setXLabels(xlabels);
	graphA.setYLabels(ylabels);

	graphA.show(); 
	graphEdited.show();
	graphA.showLabels();	

	p.stroke(0);
	p.line(graphEdited.getPosition(0).x - 20, graphEdited.getPosition(0).y, graphEdited.getPosition(0).x - 5, graphEdited.getPosition(0).y);
	p.line(graphA.border.left, graphA.getPosition(maxValuePos).y, graphA.border.right,   graphA.getPosition(maxValuePos).y);
	p.noStroke();
	p.fill(0);
	rmsValue = 20 * Math.log10(Math.abs(graphEdited.getValue(0)));
	p.text(rmsValue.toFixed(2) + " dBFS", graphEdited.getPosition(0).x, graphEdited.getPosition(0).y - 5);

	peakValue = 20 * Math.log10(Math.abs(graphA.getValue(maxValuePos)));	
	p.text(peakValue.toFixed(2) + " dBFS",  graphEdited.getPosition(0).x, graphA.getPosition(maxValuePos).y - 5);
	
	//GUI
	periodsSlider.show();
	volumeSlider.show();

	animationCheckbox.show();
	squaredCheckbox.show();
	meanCheckbox.show();
	rootCheckbox.show();
}

p.createSliders = function(){
	periodsSlider = new Slider(p, 1, 3, 1);
	periodsSlider.setRectangle(new Rectangle(150,15,230,35));
	periodsSlider.setLabel("Zoom: ");

	volumeSlider = new Slider(p, 0.5, 2);
	volumeSlider.setRectangle(new Rectangle(300,15,380,35));
	volumeSlider.setLabel("Volume: ");
	volumeSlider.setValue(1);
}

p.createCheckBoxes = function(){
	animationCheckbox= new Checkbox(p);
	animationCheckbox.setRectangle(new Rectangle(400,16, 414, 30));
	animationCheckbox.setLabel('Animation');

	squaredCheckbox= new Checkbox(p);
	squaredCheckbox.setRectangle(new Rectangle(500,16, 514, 30));
	squaredCheckbox.setLabel('Square');

	meanCheckbox= new Checkbox(p);
	meanCheckbox.setRectangle(new Rectangle(600,16, 614, 30));
	meanCheckbox.setLabel('Mean');

	rootCheckbox= new Checkbox(p);
	rootCheckbox.setRectangle(new Rectangle(700,16, 714, 30));
	rootCheckbox.setLabel('Root');
}

p.createXLabels = function(){
	let xlabels = [];	
	return xlabels;
}

p.createYLabels = function(){
	let ylabels = [];		
	ylabels[0] = {y:1, label:"0 dBFS"};
	ylabels[1] = {y:0, label:"-oo dBFS"};
	ylabels[2] = {y:-1, label:"0 dBFS"};
	return ylabels;
}
}

var p5canvas = new p5(headroom_sketch);