var app=angular.module("paintApp",['ngTouch']);

app.controller("AddColorController",function(){
	var acc=this;
	
	//set initial values of red, green, and blue sliders
	acc.setRed=0;
	acc.setGreen=255;
	acc.setBlue=0;
	
	//set initial value of paintbrush
	acc.brushSize=20;

	//set initial value of opacity
	acc.setOpacity=1;
	
	//can't draw until mouse down
	acc.canDraw=false;

	//instruction message
	acc.instruct=true;

	//enlarge painting state
	acc.enlarge=false;

	//an array that holds rgb values as objects
	acc.colorArray=[];
	
	//an array that holds rgb values, left and right values, and width and height values as objects
	acc.paintbrushArray=[];

	//an array that holds paintings
	acc.paintingsArray=[];
	
	//a function that adds an rgb object to the array
	acc.addColor=function(){
		acc.colorArray.push({red:acc.setRed,green:acc.setGreen,blue:acc.setBlue});
	};
	
	//a function that takes an index as a parameter, removes border if index is clicked index, and removes the clicked rgb object
	acc.removeColor=function(index){
		if(index==acc.currIndex){
			acc.currIndex=null;
		}
		acc.colorArray.splice(index,1);
	};
	
	//a function that takes an index as a parameter, and stores the rgb object values and clicked index as variables
	acc.getColor=function(index){
		acc.drawRed=acc.colorArray[index].red;
		acc.drawGreen=acc.colorArray[index].green;
		acc.drawBlue=acc.colorArray[index].blue;

		acc.currIndex=index;

		acc.instruct=false;
	};
		
	//a function that takes a click event as a parameter, and adds rgb, left, right, width, height values to the array
	acc.paintCanvas=function(event){
		if(acc.canDraw){
			acc.paintbrushArray.push({x:acc.brushX, y:acc.brushY,red:acc.drawRed,green:acc.drawGreen,blue:acc.drawBlue,width:acc.brushSize,height:acc.brushSize,opacity:acc.setOpacity,username:acc.currUsername});
		}
	};

	//a function that takes a click event as a parameter, and sets the x and y coordinates to that event
	acc.brushCursor=function(event){
		acc.brushX=event.offsetX/event.target.offsetWidth*100;
		acc.brushY=event.offsetY/event.target.offsetHeight*100;
	};

	//a function that takes a touch event as a parameter, and sets the x and y coordinates to that event
	acc.touchCursor=function(event){
		acc.brushX=(event.touches[0].pageX - event.touches[0].target.offsetLeft + 0.5*event.touches[0].target.offsetWidth)/(event.touches[0].target.offsetWidth)*100;
		acc.brushY=(event.touches[0].pageY - event.touches[0].target.offsetTop + 0.5*event.touches[0].target.offsetHeight - 0.05*window.innerHeight)/(event.touches[0].target.offsetHeight)*100;
	}

	//a function that clears the canvas
	acc.clearCanvas=function(){
		acc.paintbrushArray=[];
	};

	//a function that goes to gallery.html
	acc.toProfile=function(){
		location.href='gallery.html';
	};

	//a function that goes to index.html
	acc.toPaint=function(){
		location.href='index.html';
	};

	//a function that enlarges a painting
	acc.enlargePainting=function(painting){
		acc.enlarge=true;
		acc.paintingIndex=acc.paintingsArray.indexOf(painting);
		acc.paintbrushArray=painting;
	};

	//a function that deletes a painting
	acc.removePainting=function(){
		acc.paintingsArray.splice(acc.paintingIndex,1);
		localStorage.setItem('painting',JSON.stringify(acc.paintingsArray));
	};

	//a function that saves the palette
	acc.savePalette=function(){
		localStorage.setItem('palette',JSON.stringify(acc.colorArray));
	};

	//a function that saves the paintings and goes to gallery.html
	acc.saveCanvas=function(){
		acc.paintingsArray.push(acc.paintbrushArray);
		localStorage.setItem('painting',JSON.stringify(acc.paintingsArray));
		acc.toProfile();
	};

	//a function that saves that palette
	acc.savePalette=function(){
		localStorage.setItem('palette',JSON.stringify(acc.colorArray));
	}

	//a function that loads the paintings
	acc.loadPaintings=function(){
		if(localStorage.getItem('painting')!=null){
			acc.paintingsArray=JSON.parse(localStorage.getItem('painting'));
		}
	};

	//a function that loads the palette
	acc.loadPalette=function(){
		if(localStorage.getItem('palette')!=null){
			acc.colorArray=JSON.parse(localStorage.getItem('palette'));
		}
	};

	acc.loadPaintings();
	acc.loadPalette();
});
