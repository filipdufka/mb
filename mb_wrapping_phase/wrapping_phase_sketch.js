var wrapping_phase_sketch = function(p){
	let gs, bezier;
let margin, minWraps, maxWraps;
let unwrapTime;

let maxWrapsSlider, unwrapCheckbox;

// popisky
// střed slideru - 5 wrapů, krokovej
// osa  wrapu - +- 180
// celá osa s popiskama po 180°
// beziér vzhůru nohama

// tlačítko semilog x -> linear

// levý horní vždy 0°
// krajní vždy lock x

// popisky freq

// beziér default: 
//       0 - (-hromada) 1/log(x) [0-1], ( lineraní ramp do log) 

// hightlight wrap rectangle
// wrap vždy k nule

// preset buttons (3,4)

p.setup = function() {
	p.createCanvas(900, 900);
	createUI();

	calculateWraps();
	margin = 30;
	unwrapTime = 1;

	gs = new Guides(p);
	gs.addHorizontal(margin);
	gs.addHorizontal(p.height - margin);
	gs.addVertical(margin);
	gs.addVertical(p.width - margin);

	bezier = new BezierCurve();
	bezier.createNewPoint(new p5.Vector(gs.vs[0], gs.hs[0]));
	bezier.createNewPoint(new p5.Vector(gs.vs[gs.vs.length - 1] - 20, gs.hs[0]));
	bezier.createNewPoint(new p5.Vector(gs.vs[gs.vs.length - 1], gs.hs[0] + 20));	
	bezier.createNewPoint(new p5.Vector(gs.vs[gs.vs.length - 1], gs.hs[gs.hs.length - 1]));
	

}

function calculateWraps(){
	maxWraps = maxWrapsSlider.getValue();
	minWraps = -maxWraps;
}

function getWrapHeight(){
	return (gs.hs[gs.hs.length - 1] -  gs.hs[0]) / maxWraps;
}

p.draw = function() {
	// lock X axis to anchor points
	bezier.getSegmentPoint(0,0).pos.x = gs.vs[0];
	bezier.getSegmentPoint(0,3).pos.x = gs.vs[gs.vs.length - 1];

	// calculating max wraps
	calculateWraps();
	p.clear();

	p.strokeWeight(1);
	p.stroke(220);
	// border guides
	gs.show();

	// wrap guides
	for (let i = minWraps; i < maxWraps; i++) {
		let hGuide = new p5.Vector(0,i * 2 * Math.PI);
		hGuide = getCanvasPos(hGuide);
		p.line(gs.vs[0], hGuide.y , gs.vs[gs.vs.length - 1], hGuide.y);	
	}	

	p.stroke(70);
	let bezierDrawPoints = bezier.getDrawPoints();
	let bezierAnchorPoints = bezier.getAnchorPoints();

	// Unwrapped
	for (let i = 1; i < bezierDrawPoints.length; i++) {
		let A = bezierDrawPoints[i-1];
		let B = bezierDrawPoints[i];
		p.line(A.x, A.y, B.x, B.y);	
	}

	p.stroke(230, 125, 45);
	let lineSeq = splitSequence(bezierDrawPoints);
	for (let i = 0; i < lineSeq.length; i++) {
		let A = lineSeq[i].A;
		let B = lineSeq[i].B;		
		let wrap = lineSeq[i].wrap;
		
		let unwrapTarget = wrap *  getWrapHeight();

		A.y += unwrapTarget * unwrapTime;
		B.y += unwrapTarget * unwrapTime;

		p.line(A.x, A.y, B.x, B.y);
	}

	p.stroke(30);
	for(let i = 0; i < bezierAnchorPoints.length; i++){
		bezierAnchorPoints[i].show(p);
	}

	showUI();
	let targetTime = unwrapCheckbox.value? 1 : 0;
	unwrapTime = p.lerp(unwrapTime, targetTime, 0.05);
}

function splitSequence(seq){
	let lineSeq = [];
	for (let i = 1; i < seq.length; i++) {
		let A = new p5.Vector(seq[i-1].x,seq[i-1].y);
		let B = new p5.Vector(seq[i].x,seq[i].y);

		let tA = getPlotPos(A);
		let tB = getPlotPos(B);	

		let wrapA = Math.floor(tA.y / (2 * Math.PI));
		let wrapB = Math.floor(tB.y / (2 * Math.PI));

		if(wrapA == wrapB){			
			let thisLine = {A: A, B: B, wrap: wrapA};
			lineSeq.push(thisLine);
		}else{
			let maxPoint = Math.max(tA.y, tB.y);
			let wrapMax = Math.floor(maxPoint / (2 * Math.PI));
			let angleIntersect = (2 * Math.PI) * wrapMax;
			let plotIntersectY = p.map(angleIntersect, tA.y, tB.y, A.y, B.y);
			let plotIntersectX = p.map(angleIntersect, tA.y, tB.y, A.x, B.x);

			let newB = new p5.Vector(plotIntersectX, plotIntersectY);
			let lineA = {A: A, B: newB, wrap: wrapA};
			lineSeq.push(lineA);
			
			let newA = new p5.Vector(plotIntersectX, plotIntersectY); 
			let lineB = {A: newA, B: B, wrap: wrapB};
			lineSeq.push(lineB);
		}
		
	}	
	return lineSeq;
}

function getPlotPos(canvasPos){
	let plotY = p.map(canvasPos.y, gs.hs[gs.hs.length - 1], gs.hs[0], 0, maxWraps * 2 * Math.PI);
	return new p5.Vector(canvasPos.x, plotY);
}

function getCanvasPos(plotPos){
	let canvasY = p.map(plotPos.y, 0, maxWraps * 2 * Math.PI, gs.hs[gs.hs.length - 1], gs.hs[0]);
	return new p5.Vector(plotPos.x, canvasY);
}

function createUI(){
	maxWrapsSlider = new Slider(p, 3,11,2);
	maxWrapsSlider.setRectangle(new Rectangle(200,15,280,35));
	maxWrapsSlider.setLabel("Max Wraps: ");	
	maxWrapsSlider.value = 0.5;

	unwrapCheckbox = new Checkbox(p);
	unwrapCheckbox.setRectangle(new Rectangle(358,16, 372, 30));
	unwrapCheckbox.setLabel("Unwrap: ");
}

function showUI(){
	maxWrapsSlider.show();
	unwrapCheckbox.show();
}
}


var p5canvas = new p5(wrapping_phase_sketch);