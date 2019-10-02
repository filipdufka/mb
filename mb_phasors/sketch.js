let phasorA, phasorB;
let guides;

function setup() {
	createCanvas(900, 900);
	guides = new Guides();
	guides.addHorizontal(height/2);
	guides.addVertical(width/2);

	phasorA = new Phasor(createVector(0,100), 'lightblue');
}

function draw() {
	guides.show();
	phasorA.show();
}

class Phasor{	
	constructor(v, col){
		this.v = v;
		this.col = col;
	}

	show(){
		let center = createVector(guides.vs[0], guides.hs[0]);		
		drawArrow(center, this.v, this.col);
	}
}