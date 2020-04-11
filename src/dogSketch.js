let col;
let size = 500;
let startPos = null;
let lastPos = null;
let valueToUpdate = null;

let sliders = {"tail": {"bounds": [0, 0, 0, 0],"min": size/10, "max":size/6, "value": size/7}, "belly": {"bounds":[0, 0, 0, 0],"min": -size/6, "max":0, "value": -size/12}, "leftLeg": {"bounds":[0, 0, 0, 0],"min": 0, "max":size/6,  "value":size/12}, "nose": {"bounds": [0, 0, 0, 0],"min": -size/30, "max":0, "value": 0}, "ear": {"bounds": [0, 0, 0, 0],"min": -size/10, "max":size/10, "value": size/10}}

function setup() {
  // create the drawing canvas, save the canvas element
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);
  randomiseDogColour();
  createSliders();
}

function setStartingPos(x, y, sliderName){	
	startPos = createVector(x, y);	
	pastPos = startPos;
	valueToUpdate = sliderName;
}

function createSliders(size, groundLevel, legHeight){
	let mid = windowWidth/2;
	stroke(0);
	//tail
	sliders["tail"]["bounds"] = [mid+size/5, mid+size/5+size/3, groundLevel-size/1.8-legHeight,  groundLevel-size/1.8-legHeight+size/3];
	//belly
	sliders["belly"]["bounds"] = [mid-size/15, mid-size/15+size/5, groundLevel-size/3-legHeight, groundLevel-size/3-legHeight+size/4];
	//left leg
	sliders["leftLeg"]["bounds"] = [mid-size/5, mid-size/5+size/10, groundLevel-size/6-legHeight, groundLevel-size/6-legHeight+size/4+legHeight];
	//nose
	sliders["nose"]["bounds"] = [mid-size/2.2, mid-size/2.2+size/6, groundLevel-size/2.2-legHeight, groundLevel-size/2.2-legHeight+size/6];
	//ear
	sliders["ear"]["bounds"] = [mid-size/3.5, mid-size/3.5+size/6, groundLevel-size/1.8-legHeight,  groundLevel-size/1.8-legHeight+size/4];
}

function randomiseDogColour(){
	col = [random(0, 255), random(50, 255), random(100, 200)];
}

function checkInBounds(rectBounds){
	if(mouseX <= rectBounds[1] && mouseX >= rectBounds[0]){
		if(mouseY <= rectBounds[3] && mouseY >= rectBounds[2]){
			return true;
		}
	}
	return false;
}

function mousePressed(){
	for(slider in sliders){
		if(checkInBounds(sliders[slider]["bounds"])){
			setStartingPos(mouseX, mouseY, slider);
		}
	}		
}

function mouseReleased(){
	startPos = null;
	valueToUpdate = null;
	lastPos = null;
}

function draw(){
	background(255, 0, 255);
	let groundLevel = windowHeight/2+size/7;
	createSliders(size, groundLevel, drawDog(col, size));
	for(slider in sliders){
		if(checkInBounds(sliders[slider]["bounds"])){
			fill(0);
			stroke(0);
			ellipse(mouseX, mouseY, 10, 10);
		}	
		if(startPos!=null&&valueToUpdate==slider){		
			let sliderMax = sliders[slider]["bounds"][3];
			let sliderMin = sliders[slider]["bounds"][2];	
			let mouseYbounded = mouseY;//max(min(mouseY, sliderMax), sliderMin);
			if(slider=="nose"){
				mouseYbounded = mouseX;
				if(mouseYbounded!=lastPos){
				lastPos = mouseYbounded;
				let adjustment = (startPos.x-mouseYbounded);
				if(adjustment!=0){
					adjustment/=abs(startPos.x-mouseYbounded);
				}
				adjustment*=2;
				let sliderValue = sliders[slider]["value"]+adjustment;
				sliders[slider]["value"] = min(max(sliderValue, sliders[slider]["min"]), sliders[slider]["max"]);	
				
			}
			}
			else{
				if(mouseYbounded!=lastPos){
				lastPos = mouseYbounded;
				let adjustment = (startPos.y-mouseYbounded);
				if(adjustment!=0){
					adjustment/=abs(startPos.y-mouseYbounded);
				}
				adjustment*=2;
				let sliderValue = sliders[slider]["value"]+adjustment;
				sliders[slider]["value"] = min(max(sliderValue, sliders[slider]["min"]), sliders[slider]["max"]);	
				
			}
				
			}
			
			
			
		}
		
	}		
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight, true);
}

function drawDog(midColour, size) {	
	let height = 0;
	let earLength = 0;
	let weight = 0;
	let tailLength = 0;
    let strokeWidth = 0.5;
    angleMode(DEGREES);
  	noStroke();
    height = midColour[0]/4;
    earLength = sliders["ear"]["value"];
    weight = sliders["belly"]["value"];
    tailLength = sliders["tail"]["value"];
    let legHeight = sliders["leftLeg"]["value"];
    //basic dog shape
	
    //head
    let headX = windowWidth/2 - size/4;
    let headY = windowHeight/2 -size/4-legHeight;
    let headHeight = size/6;
    let headLength = size/7;

    let noseHeight = headHeight/1.5;
    let noseLength = headLength;
	let noseSlider = sliders["nose"]["value"];
    let noseX = headX-(headLength/2)+3;
    let noseY = headY + headHeight/9;

    //body
    let chestX = headX;
    let chestY = headY + headHeight/2;
    let chestHeight = headHeight*1.2;
    let chestLength = headLength*3.5;

    //legs
    let leftLegX = chestX+chestLength/6;
    let leftLegY = chestY + chestHeight;
    let leftLegHeight = chestHeight/4+legHeight;
    let leftLegLength = chestLength/8;

    let rightLegX = chestX + chestLength;
    let rightLegY = chestY + chestHeight/2;
    let rightLegHeight = chestHeight/4+legHeight+chestHeight/2;
    let rightLegLength = chestLength/8;

    let footHeight = chestHeight/4;
    let footLength = chestLength/5;

    //custom dog shape
    let dogShape = [[chestX+chestLength*0.6, chestY-noseHeight/3],
                    [chestX+chestLength*0.9, chestY-chestHeight/4],
                    [chestX+chestLength, chestY],
                    [chestX+chestLength, rightLegY+rightLegHeight/3],
                  [rightLegX+rightLegLength/2+rightLegHeight/20, rightLegY+rightLegHeight*0.6], //////LEFT
                  [rightLegX+rightLegLength*0.7, rightLegY+rightLegHeight],
                  [rightLegX+footLength/4, rightLegY+rightLegHeight+footHeight],
                  [rightLegX-footLength/2, rightLegY+rightLegHeight+footHeight],
                  [rightLegX-footLength/2, leftLegY+leftLegHeight+footHeight/2],
                  [rightLegX, rightLegY+rightLegHeight],
                  [rightLegX+rightLegHeight/20-rightLegLength/2, rightLegY+rightLegHeight/1.5], //////LEFT
                  [chestX+chestLength/3+chestLength/2, rightLegY+rightLegHeight/3],
                  [chestX+chestLength/4+chestLength/2, chestY+chestHeight/2],
                  [chestX+chestLength/1.9-weight/3, chestY+chestHeight/1.7-weight/3], //fat
                  [chestX+chestLength/2.15, chestY+chestHeight/1.25-weight/3.5], //fat
                  [chestX+chestLength/2.4, chestY+chestHeight/1.25-weight/3.5+(leftLegY+chestHeight/20-chestY-chestHeight/1.25+weight/3.5)/2], //fat
                  [leftLegX+leftLegLength*1.4, leftLegY+chestHeight/20],
                  [leftLegX+leftLegLength*0.7, leftLegY+leftLegHeight],
                  [leftLegX+footLength/4, leftLegY+leftLegHeight+footHeight], [leftLegX-footLength/2, leftLegY+leftLegHeight+footHeight],
                  [leftLegX-footLength/2, leftLegY+leftLegHeight+footHeight/2], [leftLegX, leftLegY+leftLegHeight*0.98], [chestX+chestLength/6, chestY+chestHeight],
                  [chestX+chestLength/20, chestY+ chestHeight/2+chestHeight/6], [chestX, chestY], [noseX, noseY+noseHeight/2],
                  [noseX-noseLength/3, noseY+noseHeight/4], [noseX-noseLength/2-noseSlider, noseY], [noseX, noseY-noseHeight/2], [noseX+noseLength/10, headY-headHeight/2.5],
                  [headX, headY-headHeight/2], [headX+headLength/1.7, headY-headHeight/3], [headX+headLength/1.3, headY], [leftLegX+leftLegLength, noseY+noseHeight/2],
                  [chestX+chestLength*0.6, chestY-noseHeight/3]];
    drawBody(midColour, dogShape);
	drawTail(dogShape, tailLength, headLength, size);
	drawEars(midColour, headX, headY, headLength, headHeight, earLength);
  	return legHeight;
	}
	
	function drawBody(midColour, dogShape){
		fill(midColour);
		beginShape();
        curveTightness(0.2);
        curveVertex(dogShape[0][0], dogShape[0][1]);
        //back
        curveVertex(dogShape[0][0], dogShape[0][1]);
        curveVertex(dogShape[1][0], dogShape[1][1]);
        curveVertex(dogShape[2][0], dogShape[2][1]);
        //right leg
        curveVertex(dogShape[3][0], dogShape[3][1]);
        curveVertex(dogShape[4][0], dogShape[4][1]);
        curveVertex(dogShape[5][0], dogShape[5][1]);
        curveVertex(dogShape[6][0], dogShape[6][1]);
        curveVertex(dogShape[7][0], dogShape[7][1]);
        curveVertex(dogShape[8][0], dogShape[8][1]);
        curveVertex(dogShape[9][0], dogShape[9][1]);
        curveVertex(dogShape[10][0], dogShape[10][1]);
        curveVertex(dogShape[11][0], dogShape[11][1]);
        curveVertex(dogShape[12][0], dogShape[12][1]);
        //stomach
        curveVertex(dogShape[13][0], dogShape[13][1]);
				curveVertex(dogShape[14][0], dogShape[14][1]);
        curveVertex(dogShape[15][0], dogShape[15][1]);
        //left leg
        curveVertex(dogShape[16][0], dogShape[16][1]);
        curveVertex(dogShape[17][0], dogShape[17][1]);
        curveVertex(dogShape[18][0], dogShape[18][1]);
        curveVertex(dogShape[19][0], dogShape[19][1]);
        curveVertex(dogShape[20][0], dogShape[20][1]);
        curveVertex(dogShape[21][0], dogShape[21][1]);
        curveVertex(dogShape[22][0], dogShape[22][1]);
        //chest
        curveVertex(dogShape[23][0], dogShape[23][1]);
        curveVertex(dogShape[24][0], dogShape[24][1]);
        //face
        curveVertex(dogShape[25][0], dogShape[25][1]);
        curveVertex(dogShape[26][0], dogShape[26][1]);
        curveVertex(dogShape[27][0], dogShape[27][1]);
        curveVertex(dogShape[28][0], dogShape[28][1]);
        curveVertex(dogShape[29][0], dogShape[29][1]);
        curveVertex(dogShape[30][0], dogShape[30][1]);
        curveVertex(dogShape[31][0], dogShape[31][1]);
        curveVertex(dogShape[32][0], dogShape[32][1]);
        //back
        curveVertex(dogShape[33][0], dogShape[33][1]);
        curveVertex(dogShape[34][0], dogShape[34][1]);
    endShape();
		
	}
	
function drawTail(dogShape, tailLength, headLength, size){
//tail
	
    let tailX = dogShape[1][0]+(dogShape[2][0]-dogShape[1][0])/2;
    let tailY = dogShape[2][1];
    let tailHeight = tailLength;
    let tailWidth = headLength/4;
    beginShape();
        curveTightness(0);
        curveVertex(tailX, tailY);
        curveVertex(tailX, tailY);
        curveVertex(tailX+tailLength/2, tailY-tailHeight/10);
        curveVertex(tailX+tailLength/1.2, tailY-tailHeight/2+tailWidth/4);
        curveVertex(tailX+tailLength, tailY-tailHeight);
        curveVertex(tailX+tailLength/2, tailY-tailHeight/2+tailWidth/4);
        curveVertex(tailX, tailY-tailWidth);
        curveVertex(tailX, tailY-tailWidth);
    endShape();

}


function drawEars(midColour, headX, headY, headLength, headHeight, earLength){
//ears
	
  	fill(midColour);
	
    let earX = headX + headLength/20;
    let earY = headY - headHeight/4;
	let earWidth = headLength/2;
	earLength*=-1;
	if(abs(earLength)<size/20){
		earLength = size/20+(earLength/(abs(earLength)));
	}
	if(earLength<0){
		noStroke();
	}
	else{
		stroke(255);
	}
    quad(earX+earWidth/4, earY+earLength, earX, earY-headLength/4, earX+earWidth, earY,
      earX+earWidth-earWidth/4, earY+earLength/1.5);
  	noStroke();

}	

