var phasors_sketch = function(p){
let phasorA, phasorB,phasorSum;
let guides, mousePos;
let selectedPhasor;

// ✔ ❌
// textbox úhlů, textbox magnitude ❌
// checkbox lock magnitude per phasor ❌
// fix max magnitude (0 - 1)¨ ❌
// červená součet, o pixel tlustčí ❌
// spojit s mb_sin_add - tedy dvě sinusovky s fázema❌


p.setup = function() {
	p.createCanvas(900, 900);
	guides = new Guides(p);
	guides.addHorizontal(p.height/2);
	guides.addVertical(p.width/2);

	phasorA = new Phasor(p, p.createVector(-100,-100), 'darkblue');
	phasorB = new Phasor(p, p.createVector(200,-100), 'red');
	phasorSum = new Phasor(p, p.createVector(0, 0), 'green');
}

p.draw = function() {
	p.clear();
	mousePos = p.createVector(p.mouseX, p.mouseY);
	p.strokeWeight(1);
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
	constructor(p, v, col){
		this.v = v;
		this.col = col;
		this.center = new p5.Vector(guides.vs[0], guides.hs[0]);
		this.hover = false;	
		this.p = p;
	}

	show(){
		this.getHover();
		
		drawArrow(p, this.center, this.getEnd(), this.hover?p.color(125,200,255):this.col);
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
			if(this.p.mouseIsPressed){
				  selectedPhasor = this;                      
			}
		}else{
				this.hover = false;                  
		}
		if(this.p.mouseIsPressed == false){
				selectedPhasor = null;
		}
	}
}
}

var p5canvas = new p5(phasors_sketch);