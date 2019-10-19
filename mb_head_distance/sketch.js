let soundSource, gs;
let headPos, headRadius, earsPos ;

function setup() {
	createCanvas(900, 900);

	headPos = createVector(width/2, height/2);
	headRadius = 50;
	earsPos = {left: createVector(headPos.x - headRadius, headPos.y), right: createVector(headPos.x + headRadius, headPos.y)};

	soundSource = new DraggablePoint(createVector(headPos.x, headPos.y/2));

}

function draw() {
	clear();

	drawHead();	
	drawPath();

	stroke(30);
	fill(30) ;	
	soundSource.show();
}

function drawLineToCenter(){
	strokeWeight(1);
	stroke(255,30,120);
	line(soundSource.pos.x, soundSource.pos.y, headPos.x, headPos.y);
}

function getSidePoints(){		
	let sourceDist = headPos.dist(soundSource.pos);
	let midPos = createVector((headPos.x + soundSource.pos.x) / 2, (headPos.y + soundSource.pos.y) / 2);	

	let inters = circlesIntersection(headPos.x, headPos.y, headRadius, midPos.x, midPos.y, sourceDist /2);
	if(inters != false){
		return {left: inters[0], right: inters[1]};
	}else{
		let perpendicular = p5.Vector.sub(headPos, soundSource.pos);
		perpendicular.rotate(HALF_PI);
		perpendicular.normalize();
		perpendicular.mult(headRadius);
		let leftPos = createVector(headPos.x - perpendicular.x, headPos.y - perpendicular.y);
		let rightPos = createVector(headPos.x + perpendicular.x, headPos.y + perpendicular.y);
		return {left: leftPos, right: rightPos};
	}



}

function drawLineToSides(){
	strokeWeight(1);
	stroke(30,120,120);
	let sidePoints = getSidePoints();	
	line(headPos.x, headPos.y, sidePoints.right.x, sidePoints.right.y);
	line(headPos.x, headPos.y, sidePoints.left.x, sidePoints.left.y);
	line(soundSource.pos.x, soundSource.pos.y, sidePoints.right.x, sidePoints.right.y);
	line(soundSource.pos.x, soundSource.pos.y, sidePoints.left.x, sidePoints.left.y);
}

function drawPath(){
	
	stroke(30,120,190);
	drawShortestDistance(earsPos.left);
	stroke(190,30,120);
	drawShortestDistance(earsPos.right);
}

function drawShortestDistance(earPos){

	let sidePoints = getSidePoints();
	let closestSidePoint = sidePoints.left.dist(earPos) < sidePoints.right.dist(earPos) ? sidePoints.left : sidePoints.right;

	strokeWeight(6);

	if(earPos.dist(soundSource.pos) <= closestSidePoint.dist(soundSource.pos)){
		// Ear is Close
		line(earPos.x, earPos.y, soundSource.pos.x, soundSource.pos.y);
	}else{
		// Ear is Far
		line(closestSidePoint.x, closestSidePoint.y, soundSource.pos.x, soundSource.pos.y);
		let zeroVec = createVector(-1,0);
		let closestSideDir = p5.Vector.sub(closestSidePoint, headPos);
		let angleSide = closestSideDir.heading();
		
		let earDir = p5.Vector.sub( earPos, headPos);
		angleEar = earDir.heading();

		if((angleEar - angleSide) > PI){ angleSide = cleanAngle(angleSide);	}
		arc(headPos.x, headPos.y, headRadius * 2, headRadius * 2, min(angleEar, angleSide), max(angleSide, angleEar));
		
	}

	
}

function drawHead(){
	//head
	noStroke();
	circle(headPos.x, headPos.y, headRadius * 2);
	circle(earsPos.left.x, earsPos.left.y, headRadius / 2);
	circle(earsPos.right.x, earsPos.right.y, headRadius / 2);
}

function cleanAngle(angle){
	while(angle < 0){
		angle += 2 * PI;
	}
	return angle;
}