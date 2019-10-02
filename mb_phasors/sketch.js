let phasorA, phasorB;
let guides;

function setup() {
	createCanvas(900, 900);
	guides = new Guides();
	guides.addHorizontal(height/2);
	guides.addVertical(width/2);

	phasorA = new Phasor(createVector(-100,-100), 'darkblue');
}

function draw() {
	strokeWeight(1);
	guides.show();
	phasorA.show();
}

class Phasor{	
	constructor(v, col){
		this.v = v;
		this.col = col;
		this.center = createVector(guides.vs[0], guides.hs[0]);
	}

	show(){
		this.getHover();

		drawArrow(this.center, this.v), this.col;
	}

	getHover(){
		let mousePos = createVector(mouseX, mouseY);
		//distToSegment(mousePos, )
	}
}