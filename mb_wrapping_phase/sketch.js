let gs, bezier;
let margin, maxAngle, maxWraps;
let unwrapTime;

let maxWrapsSlider, unwrapCheckbox;

function setup() {
	createCanvas(900, 900);
	createUI();

	calculateWraps();
	margin = 30;
	unwrapTime = 1;

	gs = new Guides();
	gs.addHorizontal(margin);
	gs.addHorizontal(height - margin);
	gs.addVertical(margin);
	gs.addVertical(width - margin);

	bezier = new BezierCurve();
	bezier.createNewPoint(createVector(gs.vs[0], gs.hs[gs.hs.length - 1]));
	bezier.createNewPoint(createVector(gs.vs[0], gs.hs[0]));	
	bezier.createNewPoint(createVector(gs.vs[gs.vs.length - 1], gs.hs[gs.hs.length - 1]));
	bezier.createNewPoint(createVector(gs.vs[gs.vs.length - 1], gs.hs[0]));

}

function calculateWraps(){
	maxAngle = maxWrapsSlider.getValue() * PI;
	maxWraps = maxAngle / (2 * PI);
}

function getWrapHeight(){
	return (gs.hs[gs.hs.length - 1] -  gs.hs[0]) / maxWraps;
}

function draw() {
	calculateWraps();
	clear();
	//offsetSlider.show();


	strokeWeight(1);
	stroke(220);
	gs.show();

	for (let i = 0; i < maxWraps; i++) {
		let A = createVector(0,i * 2 * PI);
		A = getCanvasPos(A);
		line(gs.vs[0], A.y , gs.vs[gs.vs.length - 1], A.y);	
	}	

	stroke(30);
	let bezierDrawPoints = bezier.getDrawPoints();
	let bezierAnchorPoints = bezier.getAnchorPoints();

	// Unwrapped
	for (let i = 1; i < bezierDrawPoints.length; i++) {
		let A = bezierDrawPoints[i-1];
		let B = bezierDrawPoints[i];
		line(A.x, A.y, B.x, B.y);	
	}

	let lineSeq = splitSequence(bezierDrawPoints);
	for (let i = 0; i < lineSeq.length; i++) {
		let A = lineSeq[i].A;
		let B = lineSeq[i].B;		
		let wrap = lineSeq[i].wrap;
		
		let unwrapTarget = wrap *  getWrapHeight();

		A.y += unwrapTarget * unwrapTime;
		B.y += unwrapTarget * unwrapTime;

		line(A.x, A.y, B.x, B.y);
	}

	for(let i = 0; i < bezierAnchorPoints.length; i++){
		bezierAnchorPoints[i].draw();
	}

	showUI();
	let targetTime = unwrapCheckbox.value? 1 : 0;
	unwrapTime = lerp(unwrapTime, targetTime, 0.05);
}

function splitSequence(seq){
	let lineSeq = [];
	for (let i = 1; i < seq.length; i++) {
		let A = createVector(seq[i-1].x,seq[i-1].y);
		let B = createVector(seq[i].x,seq[i].y);

		let tA = getPlotPos(A);
		let tB = getPlotPos(B);	

		let wrapA = floor(tA.y / (2 * PI));
		let wrapB = floor(tB.y / (2 * PI));

		if(wrapA == wrapB){			
			let thisLine = {A: A, B: B, wrap: wrapA};
			lineSeq.push(thisLine);
		}else{
			let maxPoint = Math.max(tA.y, tB.y);
			let wrapMax = floor(maxPoint / (2 * PI));
			let angleIntersect = (2 * PI) * wrapMax;
			let plotIntersectY = map(angleIntersect, tA.y, tB.y, A.y, B.y);
			let plotIntersectX = map(angleIntersect, tA.y, tB.y, A.x, B.x);

			let newB = createVector(plotIntersectX, plotIntersectY);
			let lineA = {A: A, B: newB, wrap: wrapA};
			lineSeq.push(lineA);
			
			let newA = createVector(plotIntersectX, plotIntersectY); 
			let lineB = {A: newA, B: B, wrap: wrapB};
			lineSeq.push(lineB);
		}
		
	}	
	return lineSeq;
}

function getPlotPos(canvasPos){
	let plotY = map(canvasPos.y, gs.hs[gs.hs.length - 1], gs.hs[0], 0, maxAngle);
	return createVector(canvasPos.x, plotY);
}

function getCanvasPos(plotPos){
	let canvasY = map(plotPos.y, 0, maxAngle, gs.hs[gs.hs.length - 1], gs.hs[0]);
	return createVector(plotPos.x, canvasY);
}

function createUI(){
	maxWrapsSlider = new Slider(2,80,4);
	maxWrapsSlider.setRectangle(new Rectangle(200,15,280,35));
	maxWrapsSlider.setLabel("Max Wraps: ");	
	maxWrapsSlider.value = 0.5;

	unwrapCheckbox = new Checkbox();
	unwrapCheckbox.setRectangle(new Rectangle(358,16, 372, 30));
	unwrapCheckbox.setLabel("Unwrap: ");
}

function showUI(){
	maxWrapsSlider.show();
	unwrapCheckbox.show();
}