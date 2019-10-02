let phasorA, phasorB,phasorSum;
let guides, mousePos;
let selectedPhasor;

function setup() {
	createCanvas(900, 900);
	guides = new Guides();
	guides.addHorizontal(height/2);
	guides.addVertical(width/2);

	phasorA = new Phasor(createVector(-100,-100), 'darkblue');
	phasorB = new Phasor(createVector(200,-100), 'red');
	phasorSum = new Phasor(createVector(0, 0), 'green');
}

function draw() {
	clear();
	mousePos = createVector(mouseX, mouseY);
	strokeWeight(1);
	guides.show();

	phasorA.show();
	phasorB.show();
	if(selectedPhasor != null){
		selectedPhasor.setMouseDir();
	}
	phasorSum.v = p5.Vector.add(phasorA.v, phasorB.v);
	phasorSum.show();
}

class Phasor{	
	constructor(v, col){
		this.v = v;
		this.col = col;
		this.center = createVector(guides.vs[0], guides.hs[0]);
		this.hover = false;	
	}

	show(){
		this.getHover();
		
		drawArrow(this.center, this.getEnd(), this.hover?color(125,200,255):this.col);
	}

	getEnd(){
		return p5.Vector.add(this.center, this.v);
	}

	setMouseDir(){
		this.v = p5.Vector.sub(mousePos, this.center);
		if(this.v.mag() < 30){
			this.v.setMag(30);	
		}
	}

	getHover(){
		let dist = distToSegment(mousePos, this.center, this.getEnd());

		if(dist < 5 && this.hover == false && selectedPhasor == null){
			this.hover = true;
			if(mouseIsPressed){
				  selectedPhasor = this;                      
			}
		}else{
				this.hover = false;                  
		}
		if(mouseIsPressed == false){
				selectedPhasor = null;
		}
	}
}