
let sinGraph;

function setup() {
	createCanvas(800, 550);
	sinGraph = new Graph(new Rectangle(50,50 , width-50, height-50));
}

function draw() {
	clear();   	 
	dataSin = generateSin(millis() * 0.001);  
  	sinGraph.setData(dataSin);
  	sinGraph.show(); 
  
}