var head_distance_sketch = function(p){
	let soundSource, gs;
	let headPos, headRadius, earsPos ;
	let currentDrawColor;

	// zobrazit vzdálenosti
	// počítat s tím, že hlava je 17cm
	// změnit do stejného vizuálního stylu

	p.setup = function() {
		p.createCanvas(900, 900);

		headPos = new p5.Vector(p.width/2, p.height/2);
		headRadius = 50;
		earsPos = {left: new p5.Vector(headPos.x - headRadius, headPos.y), right: new p5.Vector(headPos.x + headRadius, headPos.y)};

		soundSource = new DraggablePoint(new p5.Vector(headPos.x, headPos.y/2));

	}

	p.draw = function() {
		p.clear();

		p.drawHead();	
		p.drawPath();

		p.stroke(30);
		p.fill(30) ;	
		soundSource.show(p);
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
		p.drawShortestDistance(earsPos.left);
		p.currentDrawColor = p.color(190,30,120);
		p.drawShortestDistance(earsPos.right);
	}

	p.drawShortestDistance = function(earPos){
		p.stroke(p.currentDrawColor);

		let sidePoints = p.getSidePoints();
		let closestSidePoint = sidePoints.left.dist(earPos) < sidePoints.right.dist(earPos) ? sidePoints.left : sidePoints.right;

		p.strokeWeight(6);

		if(earPos.dist(soundSource.pos) <= closestSidePoint.dist(soundSource.pos)){
			// Ear is Close
			p.line(earPos.x, earPos.y, soundSource.pos.x, soundSource.pos.y);			
		}else{
			// Ear is Far
			p.line(closestSidePoint.x, closestSidePoint.y, soundSource.pos.x, soundSource.pos.y);
			let zeroVec = new p5.Vector(-1,0);
			let closestSideDir = p5.Vector.sub(closestSidePoint, headPos);
			let angleSide = closestSideDir.heading();
			
			let earDir = p5.Vector.sub( earPos, headPos);
			angleEar = earDir.heading();

			if((angleEar - angleSide) > Math.PI){ angleSide = p.cleanAngle(angleSide);	}
			p.noFill();
			p.arc(headPos.x, headPos.y, headRadius * 2, headRadius * 2, Math.min(angleEar, angleSide), Math.max(angleSide, angleEar));			
		}
		// Draw Normal
		let midPoint = p5.Vector.lerp(closestSidePoint, soundSource.pos, 0.5);
		let normal = getNormal(closestSidePoint, soundSource.pos).mult(10);
		p.line(midPoint.x, midPoint.y, midPoint.x + normal.x, midPoint.y + normal.y);
		

		// Text draw
		p.noStroke();		
		p.fill(p.currentDrawColor);
		
		p.text(earPos.x, midPoint.x, midPoint.y );

		

	}

	p.drawHead = function(){
		//head
		p.noStroke();
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