var head_distance_sketch = function(p){
	let soundSource, gs;
	let headPos, headRadius, earsPos ;
	let currentDrawColor;
	let headDiameter = 17;
	let magnify;

	// zobrazit vzdálenosti
	// počítat s tím, že hlava je 17cm
	// změnit do stejného vizuálního stylu

	p.setup = function() {
		p.createCanvas(900, 900);

		headPos = new p5.Vector(p.width/2, p.height/2);
		headRadius = 50;
		earsPos = {left: new p5.Vector(headPos.x - headRadius, headPos.y), right: new p5.Vector(headPos.x + headRadius, headPos.y)};

		soundSource = new DraggablePoint(new p5.Vector(headPos.x, headPos.y/2));
		magnify = headDiameter / ( 2 * headRadius);
	}

	p.draw = function() {
		p.clear();

		p.drawHead();	
		p.drawPath();

		p.stroke(30);
		p.fill(30) ;	
		soundSource.show(p);

		p.fill(200);
		p.noStroke();
		p.textAlign(p.CENTER);
		p.text(headDiameter + " cm", headPos.x, headPos.y + 3);
	}

	p.drawLineToCenter = function(){
		p.strokeWeight(1);
		p.stroke(255,30,120);
		p.line(soundSource.pos.x, soundSource.pos.y, headPos.x, headPos.y);
	}

	p.getSidePoints = function(){		
		let sourceDist = headPos.dist(soundSource.pos);
		let midPos = new p5.Vector((headPos.x + soundSource.pos.x) / 2, (headPos.y + soundSource.pos.y) / 2);	

		let inters = circlesIntersection(headPos.x, headPos.y, headRadius, midPos.x, midPos.y, sourceDist /2);
		if(inters != false){
			return {left: inters[0], right: inters[1]};
		}else{
			let perpendicular = p5.Vector.sub(headPos, soundSource.pos);
			perpendicular.rotate(Math.PI/2);
			perpendicular.normalize();
			perpendicular.mult(headRadius);
			let leftPos = new p5.Vector(headPos.x - perpendicular.x, headPos.y - perpendicular.y);
			let rightPos = new p5.Vector(headPos.x + perpendicular.x, headPos.y + perpendicular.y);
			return {left: leftPos, right: rightPos};
		}
	}

	p.drawLineToSides = function(){
		p.strokeWeight(1);
		p.stroke(30,120,120);
		let sidePoints = getSidePoints();	
		p.line(headPos.x, headPos.y, sidePoints.right.x, sidePoints.right.y);
		p.line(headPos.x, headPos.y, sidePoints.left.x, sidePoints.left.y);
		p.line(soundSource.pos.x, soundSource.pos.y, sidePoints.right.x, sidePoints.right.y);
		p.line(soundSource.pos.x, soundSource.pos.y, sidePoints.left.x, sidePoints.left.y);
	}

	p.drawPath = function(){	
		p.currentDrawColor = p.color(30,120,190);
		p.drawShortestDistance(earsPos.left, earsPos.right);
		p.currentDrawColor = p.color(190,30,120);
		p.drawShortestDistance(earsPos.right, earsPos.left);
	}

	p.drawShortestDistance = function(earPos, otherEarPos){
		p.stroke(p.currentDrawColor);

		let sidePoints = p.getSidePoints();
		let closestSidePoint = sidePoints.left.dist(earPos) < sidePoints.right.dist(earPos) ? sidePoints.left : sidePoints.right;

		p.strokeWeight(6);

		let closestHeadPoint;
		let distance = 0;

		if(earPos.dist(soundSource.pos) <= closestSidePoint.dist(soundSource.pos)){
			// Ear is Close
			closestHeadPoint = earPos;
			distance = closestHeadPoint.dist(soundSource.pos) * magnify;
			p.line(earPos.x, earPos.y, soundSource.pos.x, soundSource.pos.y);			
		}else{
			// Ear is Far
			closestHeadPoint = closestSidePoint;
			p.line(closestSidePoint.x, closestSidePoint.y, soundSource.pos.x, soundSource.pos.y);

			let closestSideDir = p5.Vector.sub(closestSidePoint, headPos);
			let angleSide = closestSideDir.heading();
			
			let earDir = p5.Vector.sub( earPos, headPos);
			angleEar = earDir.heading();

			if((angleEar - angleSide) > Math.PI){ angleSide = p.cleanAngle(angleSide);	}

			//compute distance
			shadowAngle = Math.max(angleSide, angleEar) - Math.min(angleEar, angleSide);
			shadowDistance = shadowAngle * headDiameter / 2;
			distance = closestSidePoint.dist(soundSource.pos) * magnify + shadowDistance;

			p.noFill();
			p.arc(headPos.x, headPos.y, headRadius * 2, headRadius * 2, Math.min(angleEar, angleSide), Math.max(angleSide, angleEar));			
		}
		// Draw Normal
		let midPoint = p5.Vector.lerp(closestHeadPoint, soundSource.pos, 0.5);
		let normal = getNormal(closestSidePoint, soundSource.pos).mult(20);
		let side = Math.sign((soundSource.pos.x - closestHeadPoint.x) * (otherEarPos.y - closestHeadPoint.y) - (soundSource.pos.y - closestHeadPoint.y) * (otherEarPos.x - closestHeadPoint.x));
		normal.mult(side);
		//p.line(midPoint.x, midPoint.y, midPoint.x + normal.x, midPoint.y + normal.y);
		

		// Text draw
		p.noStroke();		
		p.fill(p.currentDrawColor);
		p.textAlign(p.RIGHT);
		if(normal.x > 0){
			p.textAlign(p.LEFT);
		}

		distance = Math.round(distance * 10) / 10;
		p.text(distance + " cm", midPoint.x + normal.x, midPoint.y + normal.y);

		

	}

	p.drawHead = function(){
		//head
		p.noStroke();
		p.fill(30);
		p.circle(headPos.x, headPos.y, headRadius * 2);
		p.circle(earsPos.left.x, earsPos.left.y, headRadius / 2);
		p.circle(earsPos.right.x, earsPos.right.y, headRadius / 2);
	}

	p.cleanAngle = function(angle){
		while(angle < 0){
			angle += 2 * Math.PI;
		}
		return angle;
	}	
}

var p5canvas = new p5(head_distance_sketch);