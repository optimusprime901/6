window.addEventListener('load',init,false);

function init(){

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	tool = "freeHand";
	mouseDownBoolean = false;
	drawX = drawY =null;

	strokeStyleColor="black";
	fillStyleColor="black";
	lineWidth = 1;
	lineLength = 10;
	canvasWidth = 800;
	canvasHeight = 600;
	bgColor = "white";
	bgColorActivated = false;
	lineJoin="round";
	lineCap="round";

	canvas.addEventListener('touchstart',mouseDown,false);
	canvas.addEventListener('touchmove',mouseMove,false);
	canvas.addEventListener('touchend',mouseUp,false);
	
	strokeStyle = document.getElementById('strokeStyle');
	strokeStyle.addEventListener('change',strokeStyleColorChange,false);

	fillStyle = document.getElementById('fillStyle');
	fillStyle.addEventListener('change',fillStyleColorChange,false);

    toolElement  = document.getElementById('toolElement');
    toolElement.addEventListener('change',toolChange,false);

    lineWidthElement = document.getElementById('lineWidthElement');
    lineWidthElement.addEventListener('change',lineWidthChange,false);

    lineLengthElement = document.getElementById('lineLengthElement');
    lineLengthElement.addEventListener('change',lineLengthChange,false);

    clearElement = document.getElementById('clearElement');
    clearElement.addEventListener('click',clear,false);

    saveImageElement = document.getElementById('saveImageElement');
    saveImageElement.addEventListener('click',saveImage,false);

    canvasWidthElement = document.getElementById('canvasWidthElement');
  //  canvasWidthElement.addEventListener('click',canvasWidthChange,false);

    canvasHeightElement = document.getElementById('canvasHeightElement');
  //  canvasHeightElement.addEventListener('click',canvasHeightChange,false);

    setCanvasSizeElement = document.getElementById('setCanvasSizeElement');
    setCanvasSizeElement.addEventListener('click',setCanvasSizeChange,false);

    bgColorElement = document.getElementById('bgColorElement');
    bgColorElement.addEventListener('change',bgColorChange,false);

    brushJoinElement = document.getElementById('brushJoinElement');;
    brushJoinElement.addEventListener('change',brushJoinChange,false);

    brushCapElement = document.getElementById('brushCapElement');
    brushCapElement.addEventListener('change',brushCapChange,false);
	freeHandObj = new freeHand();
	strokeRectangleObj = new strokeRectangle();
	fillRectangleObj = new fillRectangle();
	lineObj = new line();
	continousLinesObj = new continousLines();
	
	paint();
}


function mouseUp(e){

e.preventDefault();

	drawX = e.targetTouches[0].pageX-canvas.offsetLeft;
	drawY = e.targetTouches[0].pageY-canvas.offsetTop;

	switch(tool){

		case "freeHand":
		freeHandObj.mouseUp(e,drawX,drawY);
		break;

		case "strokeRectangle":
		strokeRectangleObj.mouseUp(e,drawX,drawY);
		break;

		case "fillRectangle":
		fillRectangleObj.mouseUp(e,drawX,drawY);
		break;

		case "line":
		lineObj.mouseUp(e,drawX,drawY);
		break;

		case "continousLines":
		continousLinesObj.mouseUp(e,drawX,drawY);
		break;
	}
	
}

function mouseDown(e){
	
e.preventDefault();

	drawX = e.targetTouches[0].pageX-canvas.offsetLeft;
	drawY = e.targetTouches[0].pageY-canvas.offsetTop;

	switch(tool){

		case "freeHand":
		freeHandObj.mouseDown(e,drawX,drawY);
		break;

		case "strokeRectangle":
		strokeRectangleObj.mouseDown(e,drawX,drawY);
		break;

		case "fillRectangle":
		fillRectangleObj.mouseDown(e,drawX,drawY);
		break;

		case "line":
		lineObj.mouseDown(e,drawX,drawY);
		break;

		case "continousLines":
		continousLinesObj.mouseDown(e,drawX,drawY);
		break;
	}

}

function mouseMove(e){
	
e.preventDefault();

	drawX = e.targetTouches[0].pageX-canvas.offsetLeft;
	drawY = e.targetTouches[0].pageY-canvas.offsetTop;

	switch(tool){

		case "freeHand":
		freeHandObj.mouseMove(e,drawX,drawY);
		break;

		case "strokeRectangle":
		strokeRectangleObj.mouseMove(e,drawX,drawY);
		break;

		case "fillRectangle":
		fillRectangleObj.mouseMove(e,drawX,drawY);
		break;

		case "line":
		lineObj.mouseMove(e,drawX,drawY);
		break;

		case "continousLines":
		continousLinesObj.mouseMove(e,drawX,drawY);
		break;
	}
	
}


function paint(){

	//canvas.width = canvasWidth;
	//canvas.height = canvasHeight;
	if(bgColorActivated){
	ctx.fillStyle = bgColor;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	bgColorActivated = false;
}
	ctx.lineJoin = lineJoin;
	ctx.lineCap = lineCap;
	ctx.strokeStyle = strokeStyleColor;
	ctx.fillStyle = fillStyleColor; 
	ctx.lineWidth = lineWidth;

}



//strokeStyleChange
function strokeStyleColorChange(e){

	target = e.target;
	strokeStyleColor = target.value;
	paint();
}

function fillStyleColorChange(e){

	target = e.target;
	fillStyleColor = target.value;
	paint();
}

function toolChange(e){

	target = e.target;
	tool = target.value;
}

function lineWidthChange(e){
	target = e.target;
	lineWidth = target.value;
	paint();
}

function lineLengthChange(e){
	target = e.target;
	lineLength = target.value;
}

function clear(){
	ctx.clearRect(0,0,800,600);	
}

function saveImage(){

	imgData = canvas.toDataURL();
	window.open(imgData);
}

function setCanvasSizeChange(){

	//canvasWidth = canvasWidthElement.value;
	//canvasHeight = canvasHeightElement.value;
	canvas.setAttribute("width",canvasWidthElement.value);
	canvas.setAttribute("height",canvasHeightElement.value);
	paint();
}

function bgColorChange(e){

	bgColor = e.target.value;
	bgColorActivated = true;
	paint();
}

function brushJoinChange(e){

	lineJoin = e.target.value;
	paint();
}

function brushCapChange(e){

	lineCap = e.target.value;
	paint();
}













function freeHand(){
//mouseEvents
this.freeHand = function(){

	var drawX = drawY = 0;
	var mouseDownBoolean = false;
}

this.mouseUp = function(e,x,y){
	mouseDownBoolean = false;
	
}

this.mouseDown = function(e,x,y){

	this.drawX = x;
	this.drawY = y;
	
	ctx.beginPath();
	ctx.moveTo(this.drawX,this.drawY);
	

	mouseDownBoolean = true;
	//paint();
}

  this.mouseMove =function (e,x,y){
	if(mouseDownBoolean){
		this.drawX = x;
		this.drawY = y;

	ctx.lineTo(this.drawX,this.drawY);
	ctx.stroke();
	//ctx.clearRect(0,0,800,600);
	//ctx.fillText(drawX+ " " +lineLength,100,100);
	}
	//paint();
}

}//end of freeHand





















function strokeRectangle(){

this.strokeRectangle = function(){
	 var mouseDownBoolean = false;
	 var drawX = drawY2 = drawY = drawX2 = null;
	 var drew = false;
	 var w = h =0;

}
	this.mouseUp = function(e,x,y){
		//if(drew){
		mouseDownBoolean = false;
		ctx.strokeRect(this.drawX,this.drawY,this.w,this.h);
		//drew = false;
	//}
	}


	this.mouseDown = function(e,x,y){
		this.drawX = x;
		this.drawY = y;
		w= 10;
		h=10;
		mouseDownBoolean = true;
		//drew = true;
	}

	this.mouseMove = function(e,x,y){
		if(mouseDownBoolean){
		this.drawX2 = x;
		this.drawY2 = y;
		this.w = this.drawX2 - this.drawX/*this.drawX2>this.drawX ? this.drawX2 - this.drawX:this.drawX - this.drawX2*/;
		this.h = this.drawY2 - this.drawY/*this.drawY2>this.drawY? this.drawY2 - this.drawY: this.drawY - this.drawY2*/;
		/*this.w = (this.w<0)? -this.w:this.w;
		this.h = (this.h<0)? -this.h:this.h;*/
		//ctx.clearRect(0,0,800,600);
		//ctx.fillText(this.drawX + " " + this.w,100,100);
		}
	}

}//end of StrokeRectangle























function fillRectangle(){

this.fillRectangle = function(){
	 var mouseDownBoolean = false;
	 var drawX = drawY2 = drawY = drawX2 = null;
	 var drew = false;
	 var w = h =0;

}
	this.mouseUp = function(e,x,y){
		//if(drew){
		mouseDownBoolean = false;
		ctx.fillRect(this.drawX,this.drawY,this.w,this.h);
		//drew = false;
	//}
	}


	this.mouseDown = function(e,x,y){
		this.drawX = x;
		this.drawY = y;
		w= 10;
		h=10;
		mouseDownBoolean = true;
		//drew = true;
	}

	this.mouseMove = function(e,x,y){
		if(mouseDownBoolean){
		this.drawX2 = x;
		this.drawY2 = y;
		this.w = this.drawX2 - this.drawX/*this.drawX2>this.drawX ? this.drawX2 - this.drawX:this.drawX - this.drawX2*/;
		this.h = this.drawY2 - this.drawY/*this.drawY2>this.drawY? this.drawY2 - this.drawY: this.drawY - this.drawY2*/;
		/*this.w = (this.w<0)? -this.w:this.w;
		this.h = (this.h<0)? -this.h:this.h;*/
		//ctx.clearRect(0,0,800,600);
		//ctx.fillText(this.drawX + " " + this.drawX2,100,100);
		}
	}

}






















function line(){

this.line = function(){

	var drawX = drawY = drawX2 = drawY2 = 0;
}

this.mouseUp = function(e,x,y){
	mouseDownBoolean = false;
	ctx.lineTo(this.drawX2,this.drawY2);
	ctx.stroke();
	}

this.mouseDown = function(e,x,y){

	this.drawX = x;
	this.drawY = y;
	
	ctx.beginPath();
	ctx.moveTo(this.drawX,this.drawY);
	

	mouseDownBoolean = true;
	//paint();
}

  this.mouseMove =function (e,x,y){
	if(mouseDownBoolean){
		this.drawX2 = x;
		this.drawY2 = y;

	
	
	//ctx.clearRect(0,0,800,600);
	//ctx.fillText(this.drawX+ " " +this.drawX2,100,100);
	}
	//paint();
}

}//end of line




































function continousLines(){

this.continousLines = function(){
var drawX = drawY = null;

//ctx.moveTo(0,0);
}

this.mouseUp = function(e,x,y){
	/*mouseDownBoolean = false;
	ctx.lineTo(this.drawX2,this.drawY2);
	ctx.stroke();*/
	}

this.mouseDown = function(e,x,y){

	this.drawX = x;
	this.drawY = y;
	
	ctx.lineTo(this.drawX,this.drawY);
	ctx.stroke();
	ctx.moveTo(this.drawX,this.drawY);
	

	//mouseDownBoolean = true;
	//paint();
}

  this.mouseMove =function (e,x,y){
	//if(mouseDownBoolean){
		this.drawX2 = x;
		this.drawY2 = y;

	
	
	//ctx.clearRect(0,0,800,600);
	//ctx.fillText(this.drawX+ " " +this.drawX2,100,100);
	//}
}

}