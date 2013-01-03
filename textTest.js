// This bit of code takes a string of text, calculates its length using current styling, 
// evaluates the length against a property (i've used the radius of a circle, but the code
// just treats it as the width of a rectangle - there didn't seem any point writing 
// anything more sophisticated than this at this point), splits the text into lines and
// then displays the text line by line. Cheersphilip.


// work out how big the screen is
var w=window.innerWidth;
var h=window.innerHeight;


// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);


//various variables
var thingRadius = (h+w/2)/12;
var textArray = [];
var things = [];
var margin = 5;


//thing constructor
function thing (colour, description, posx, posy, radius) {
  this.colour = colour;
	this.description = description;
	this.posx = posx;
	this.posy = posy;
	this.radius = radius;

	things.push(this);
};


//create the things
find = new thing ("#8FBCE5", "Find out about a lot of things here...", w*0.4, h*0.3, thingRadius);
pay = new thing ("#04A65D", "Pay for...", w*0.6, h*0.35, thingRadius*0.9);
tell = new thing ("#2A659F", "Tell us about your little darlings...", w*0.35, h*0.65, thingRadius);
apply = new thing ("#c2aeae", "Apply for...", w*0.55, h*0.7, thingRadius*1.1);


//draw the things
function drawThings () {

	for (var i = 0; i < things.length; i++) {

		this.posX = things[i].posx;
		this.posY = things[i].posy;
		this.rad = things[i].radius;
		this.col = things[i].colour;
		this.description = things[i].description;

		// background colour 
		ctx.beginPath();
		ctx.arc(this.posX, this.posY, this.rad, 0, Math.PI * 2, false);
		ctx.closePath();

		//inner shadow
		var thingGradient = ctx.createRadialGradient(this.posX-20, this.posY-20, (this.rad)*0.9, this.posX, this.posY, (this.rad)*1.2);
		thingGradient.addColorStop(0, this.col);
		thingGradient.addColorStop(1, "black");
		ctx.fillStyle = thingGradient;
		ctx.fill();

		///////// this is where the text is called /////////

		textSpacing(i, this.description, this.posX, this.posY);

		////////////////////////////////////////////////////

	};
}


// calculate the width of the text and split it into lines
function textSpacing(index, textToSpace, xnum, ynum) {

	this.index = index;
	this.textToSpace = textToSpace;
	var tempString = "";
	var r = things[this.index].radius - margin;

	ctx.fillStyle = "#000";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.font = "bold 1.6em sans-serif";

	var wordArray = this.textToSpace.split(" ");

	for (var i = 0; i < wordArray.length; i++) {
		var word = wordArray[i];
		var metric = ctx.measureText(word);
		var wordLength = metric.width;
		var stringMetric = ctx.measureText(tempString + " ");
		var stringLength = stringMetric.width;

		if ((wordLength + stringLength) < r) {
			if (i == 0) {
				tempString = word;
			} else {
				tempString += (" " + word);
			}
		} else {
			textArray.push(tempString);
			tempString = word;
		}

		if (i== (wordArray.length)-1) {
			textArray.push(tempString);
		}

	};	
 	
	displayText(xnum, ynum);

}


//detect how many lines there are and display them

function displayText(x,y) {

	this.posX = x;
	this.posY = y;

	var lines = textArray.length;

	switch (lines) {
		case 0:
		ctx.fillText("Error: no text", this.posX, this.posY);
		break;

		case 1:
		ctx.fillText(textArray[0], this.posX, this.posY);
		break;

		case 2:
		ctx.fillText(textArray[0], this.posX, this.posY-15);
		ctx.fillText(textArray[1], this.posX, this.posY+15);
		break;

		case 3:
		ctx.fillText(textArray[0], this.posX, this.posY-25);
		ctx.fillText(textArray[1], this.posX, this.posY);
		ctx.fillText(textArray[2], this.posX, this.posY+25);
		break;

		case 4:
		ctx.fillText(textArray[0], this.posX, this.posY-40);
		ctx.fillText(textArray[1], this.posX, this.posY-15);
		ctx.fillText(textArray[2], this.posX, this.posY+15);
		ctx.fillText(textArray[3], this.posX, this.posY+40);
		break;

		case 5:
		ctx.fillText(textArray[0], this.posX, this.posY-45);
		ctx.fillText(textArray[1], this.posX, this.posY-25);
		ctx.fillText(textArray[2], this.posX, this.posY);
		ctx.fillText(textArray[3], this.posX, this.posY+25);
		ctx.fillText(textArray[4], this.posX, this.posY+45);
		break;

		default:
		ctx.fillText("Error: too much text!", this.posX, this.posY);
	}

	textArray = [];
}


// the main function that calls everything
function drawEverythingFromScratch() {
	canvas.width = canvas.width;
	drawThings();
};

