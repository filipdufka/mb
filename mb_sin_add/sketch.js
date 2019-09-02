
let graphA, graphB, graphSum, guides;
var slider;

function setup() {
	createCanvas(800, 550);

	guides = new Guides();
	guides.addHorizontal(height/2);

	rect = new Rectangle(50,50 , width-50, height-50)
	graphA = new Graph(rect);	
	graphA.setYMinMax(-2,2);
	graphB = new Graph(rect);
	graphB.setYMinMax(-2,2);	
	graphSum = new Graph(rect);	
	graphSum.setYMinMax(-2,2);
	createPhaseSlider();
}

function draw() {
	clear();   	 

	stroke(0,0,0,25);
	guides.show();

	dataA = generateSin(0);  
  	graphA.setData(dataA);
	stroke(0,0,255);
	graphA.show(); 
	  
	dataB = generateSin(slider.value());  
	graphB.setData(dataB);
	stroke(255,0,0);
	graphB.show(); 
	  
	dataSum = [];
	for(let i = 0; i < dataA.length; i++){
		dataSum[i] = dataA[i] + dataB[i];
	}
	
	graphSum.setData(dataSum);
	stroke(10);
	graphSum.show(); 
  
}

function createPhaseSlider(){
	slider = createSlider(0,2*PI,0,0.0001);
	slider.position(100,10);
	slider.style('width', '80px');
}