let gs, bezier;
let margin, maxAngle;

let offsetSlider;
function setup() {
	createCanvas(900, 900);

	maxAngle = 30 * PI;
	let maxWraps = maxAngle / (2 * PI);
	margin = 30;

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

	let wrapHeight = (gs.hs[gs.hs.length - 1] -  gs.hs[0]) / maxWraps;
	offsetSlider = new Slider(0,  wrapHeight);
	offsetSlider.setRectangle(new Rectangle(100,15,180,35));
	offsetSlider.setLabel("Offset: ");

}

function draw() {
	clear();
	offsetSlider.show();

	strokeWeight(1);
	stroke(0);
	gs.show();

	

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
		
		A.y += wrap * offsetSlider.getValue();	
		B.y += wrap * offsetSlider.getValue();

		line(A.x, A.y, B.x, B.y);
	}

	for(let i = 0; i < bezierAnchorPoints.length; i++){
		bezierAnchorPoints[i].draw();
	}
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
			console.log(angleIntersect);
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


// function wrapPoint(pos){
// 	let newY = gs.hs[gs.hs.length - 1] - pos.y;
// 	newY = newY % 100;
// 	newY -= gs.hs[gs.hs.length - 1];
// 	newY *= -1;
// 	return createVector(pos.x, newY);
// }