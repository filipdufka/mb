
let graphA, graphB, graphSum;
var slider;

function setup() {
	createCanvas(800, 550);
	rect = new Rectangle(50,50 , width-50, height-50)
	graphA = new Graph(rect);	
	graphB = new Graph(rect);	
	graphSum = new Graph(rect);	
	createPhaseSlider();
}

function draw() {
	clear();   	 
	dataA = generateSin(0);  
  	graphA.setData(dataA);
	graphA.show(); 
	  
	dataB = generateSin(slider.value());  
  	graphB.setData(dataB);
	graphB.show(); 
	  
	dataSum = [];
	for(let i; i < dataA.length; i++){
		dataSum[i] = dataA[i] + dataB[i];
	}

	graphSum.setData(dataSum);
	graphSum.show(); 
  
}

function createPhaseSlider(){
	slider = createSlider(0,2*PI,0,0.0001);
	slider.position(100,10);
	slider.style('width', '80px');
}