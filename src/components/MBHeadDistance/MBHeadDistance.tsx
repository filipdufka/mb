import React, { Component } from "react";
import Sketch from "react-p5";
import { p5InstanceExtensions, Vector } from "p5";
import { DraggablePoint} from '../../utils2/draggablePoint'
import { circlesIntersection, getNormal } from "../../utils2/commonMath";


export default class MBHeadDistance extends Component {
    soundSource : DraggablePoint; 
    gs;	headPos; headRadius; earsPos ;
	currentDrawColor;
	headDiameter = 17;
	magnify;

    setup = (p5: p5InstanceExtensions, canvasParentRef) => {
        p5.createCanvas(900, 900).parent(canvasParentRef);

        this.headPos = p5.createVector(p5.width/2, p5.height/2);
		this.headRadius = 50;
		this.earsPos = {left: p5.createVector(this.headPos.x - this.headRadius, this.headPos.y), right: p5.createVector(this.headPos.x + this.headRadius, this.headPos.y)};

		this.soundSource = new DraggablePoint(p5.createVector(this.headPos.x, this.headPos.y/2));
		this.magnify = this.headDiameter / ( 2 * this.headRadius);
    };

    draw = (p5: p5InstanceExtensions) => {
        p5.clear();

		this.drawHead(p5);	
		this.drawPath(p5);

		p5.stroke(30);
		p5.fill(30) ;	
		this.soundSource.show(p5);

		p5.fill(200);
		p5.noStroke();
		p5.textAlign(p5.CENTER);
		p5.text(this.headDiameter + " cm", this.headPos.x, this.headPos.y + 3);
    }

    render() {
        return <Sketch setup={this.setup} draw={this.draw} style={{ position: "absolute" }} />;
    }

    drawLineToCenter = (p5 : p5InstanceExtensions) => {
		p5.strokeWeight(1);
		p5.stroke(255,30,120);
		p5.line(this.soundSource.pos.x, this.soundSource.pos.y, this.headPos.x, this.headPos.y);
	}

	getSidePoints = (p5 : p5InstanceExtensions) => {		
		let sourceDist = this.headPos.dist(this.soundSource.pos);
		let midPos = p5.createVector((this.headPos.x + this.soundSource.pos.x) / 2, (this.headPos.y + this.soundSource.pos.y) / 2);	

		let inters = circlesIntersection(p5, this.headPos.x, this.headPos.y, this.headRadius, midPos.x, midPos.y, sourceDist /2);
		if(inters != false){
			return {left: inters[0], right: inters[1]};
		}else{
			let perpendicular = Vector.sub(this.headPos, this.soundSource.pos);
			perpendicular.rotate(Math.PI/2);
			perpendicular.normalize();
			perpendicular.mult(this.headRadius);
			let leftPos = p5.createVector(this.headPos.x - perpendicular.x, this.headPos.y - perpendicular.y);
			let rightPos = p5.createVector(this.headPos.x + perpendicular.x, this.headPos.y + perpendicular.y);
			return {left: leftPos, right: rightPos};
		}
	}

	drawLineToSides = (p5: p5InstanceExtensions) =>{
		p5.strokeWeight(1);
		p5.stroke(30,120,120);
		let sidePoints = this.getSidePoints(p5);	
		p5.line(this.headPos.x, this.headPos.y, sidePoints.right.x, sidePoints.right.y);
		p5.line(this.headPos.x, this.headPos.y, sidePoints.left.x, sidePoints.left.y);
		p5.line(this.soundSource.pos.x, this.soundSource.pos.y, sidePoints.right.x, sidePoints.right.y);
		p5.line(this.soundSource.pos.x, this.soundSource.pos.y, sidePoints.left.x, sidePoints.left.y);
	}

	drawPath = (p5 : p5InstanceExtensions) => {	
		this.currentDrawColor = p5.color(30,120,190);
		this.drawShortestDistance(p5, this.earsPos.left, this.earsPos.right);
		this.currentDrawColor = p5.color(190,30,120);
		this.drawShortestDistance(p5, this.earsPos.right, this.earsPos.left);
	}

	drawShortestDistance = (p5: p5InstanceExtensions, earPos : Vector, otherEarPos : Vector) => {
		p5.stroke(this.currentDrawColor);

		let sidePoints = this.getSidePoints(p5);
		let closestSidePoint = sidePoints.left.dist(earPos) < sidePoints.right.dist(earPos) ? sidePoints.left : sidePoints.right;

		p5.strokeWeight(6);

		let closestHeadPoint : Vector;
		let distance = 0;

		if(earPos.dist(this.soundSource.pos) <= closestSidePoint.dist(this.soundSource.pos)){
			// Ear is Close
			closestHeadPoint = earPos;
			distance = closestHeadPoint.dist(this.soundSource.pos) * this.magnify;
			p5.line(earPos.x, earPos.y, this.soundSource.pos.x, this.soundSource.pos.y);			
		}else{
			// Ear is Far
			closestHeadPoint = closestSidePoint;
			p5.line(closestSidePoint.x, closestSidePoint.y, this.soundSource.pos.x, this.soundSource.pos.y);

			let closestSideDir = Vector.sub(closestSidePoint, this.headPos);
			let angleSide = closestSideDir.heading();
			
			let earDir = Vector.sub( earPos, this.headPos);
			let angleEar = earDir.heading();

			if((angleEar - angleSide) > Math.PI){ angleSide = this.cleanAngle(angleSide);	}

			//compute distance
			let shadowAngle = Math.max(angleSide, angleEar) - Math.min(angleEar, angleSide);
			let shadowDistance = shadowAngle * this.headDiameter / 2;
			distance = closestSidePoint.dist(this.soundSource.pos) * this.magnify + shadowDistance;

			p5.noFill();
			p5.arc(this.headPos.x, this.headPos.y, this.headRadius * 2, this.headRadius * 2, Math.min(angleEar, angleSide), Math.max(angleSide, angleEar));			
		}
		// Draw Normal
        let midPoint : Vector = p5.createVector(
            p5.lerp(closestHeadPoint.x, this.soundSource.pos.x, 0.5),
            p5.lerp(closestHeadPoint.y, this.soundSource.pos.y, 0.5),
        ); 

		let normal = getNormal(p5, closestSidePoint, this.soundSource.pos).mult(20);
		let side = Math.sign((this.soundSource.pos.x - closestHeadPoint.x) * (otherEarPos.y - closestHeadPoint.y) - (this.soundSource.pos.y - closestHeadPoint.y) * (otherEarPos.x - closestHeadPoint.x));
		normal.mult(side);
		//p5.line(midPoint.x, midPoint.y, midPoint.x + normal.x, midPoint.y + normal.y);
		

		// Text draw
		p5.noStroke();		
		p5.fill(this.currentDrawColor);
		p5.textAlign(p5.RIGHT);
		if(normal.x > 0){
			p5.textAlign(p5.LEFT);
		}

		distance = Math.round(distance * 10) / 10;
		p5.text(distance + " cm", midPoint.x + normal.x, midPoint.y + normal.y);

		

	}

	drawHead = (p5 : p5InstanceExtensions) => {
		//head
		p5.noStroke();
		p5.fill(30);
		p5.circle(this.headPos.x, this.headPos.y, this.headRadius * 2);
		p5.circle(this.earsPos.left.x, this.earsPos.left.y, this.headRadius / 2);
		p5.circle(this.earsPos.right.x, this.earsPos.right.y, this.headRadius / 2);
	}

	cleanAngle = (angle) => {
		while(angle < 0){
			angle += 2 * Math.PI;
		}
		return angle;
	}	
}