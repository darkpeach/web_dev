var numSquares = 6;
var colors = [];
var pickedColor;



var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
//colorDisplay.textContent = pickedColor;
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var modeButton = document.querySelectorAll(".mode");



init();
function init(){
	setupModeButton();
	setupSquares();
	reset();
}

function setupSquares(){
	for (var i = 0; i < squares.length; i++) {
		//add initial colors to squares
		squares[i].style.backgroundColor = colors[i];

		//add click listeners to squares
		squares[i].addEventListener("click",function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//pick the correct color
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "correct";
				changeColor(pickedColor);
				h1.style.backgroundColor = pickedColor;
				resetButton.textContent = "Play Again?";
			}else{
			//pick the wrong color
				this.style.backgroundColor = "#232323"; 
				messageDisplay.textContent = "try again";
			}
		});
	}
}
function setupModeButton(){
	for (var i = 0; i < modeButton.length; i++) {
		modeButton[i].addEventListener("click",function(){
			modeButton[0].classList.remove("selected");
			modeButton[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "EASY" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}
// for (var i = 0; i < modeButton.length; i++) {
// 	modeButton[i].addEventListener("click",function(){
// 		modeButton[0].classList.remove("selected");
// 		modeButton[1].classList.remove("selected");
// 		this.classList.add("selected");
// 		this.textContent === "EASY" ? numSquares = 3: numSquares = 6;
// 		// if (this.textContent ==="EASY"){
// 		// 	numSquares = 3;
// 		// }else{
// 		// 	numSquares = 6;
// 		// }
// 		reset();

// 		//figure out how many squares to show
// 		//pick new colors
// 		//pick a new pickedColor
// 		//update page to reflect changes
// 	});
// }

resetButton.addEventListener("click",function(){
	// //generate all new colors
	// colors = generateRandomColors(numSquares);
	// //pick new color as answer
	// pickedColor = pickColor();
	// //change colorDisplay to match picked color
	// colorDisplay.textContent = pickedColor
	// //change all the squares
	// for (var i = 0; i < squares.length; i++) {
	// 	squares[i].style.backgroundColor = colors[i];
	// }
	// //change display background
	// h1.style.backgroundColor = "steelblue";
	// //clear the span text
	// messageDisplay.textContent = "";
	// this.textContent = "NEW COLORS"
	reset();
});

// easyBtn.addEventListener("click",function(){
// 	numSquares = 3;
// 	easyBtn.classList.add("selected")
// 	hardBtn.classList.remove("selected");
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i = 0; i < squares.length; i++) {
// 		if(colors[i]){
// 			squares[i].style.backgroundColor = colors[i];	
// 		}else{
// 			squares[i].style.display = "none";
// 		}
// 	}
// });
// hardBtn.addEventListener("click",function(){
// 	numSquares = 6;
// 	hardBtn.classList.add("selected")
// 	easyBtn.classList.remove("selected");
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for (var i = 0; i < squares.length; i++) {
// 		squares[i].style.backgroundColor = colors[i];	
// 		squares[i].style.display = "block";
// 	}
// });
// for (var i = 0; i < squares.length; i++) {
// 	//add initial colors to squares
// 	squares[i].style.backgroundColor = colors[i];

// 	//add click listeners to squares
// 	squares[i].addEventListener("click",function(){
// 		//grab color of clicked square
// 		var clickedColor = this.style.backgroundColor;
// 		//pick the correct color
// 		if (clickedColor === pickedColor) {
// 			messageDisplay.textContent = "correct";
// 			changeColor(pickedColor);
// 			h1.style.backgroundColor = pickedColor;
// 			resetButton.textContent = "Play Again?";
// 		}else{
// 		//pick the wrong color
// 			this.style.backgroundColor = "#232323"; 
// 			messageDisplay.textContent = "try again";
// 		}
// 	})
// };

//reset function
function reset(){
	//generate all new colors
	colors = generateRandomColors(numSquares);
	//pick new color as answer
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor
	//change all the squares
	for (var i = 0; i < squares.length; i++) {
		if(colors[i]){
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		}else{
			squares[i].style.display = "none";
		}
		
	}
	//change display background
	h1.style.backgroundColor = "steelblue";
	//clear the span text
	messageDisplay.textContent = "";
	resetButton.textContent = "NEW COLORS"
}
//change color function
function changeColor(color){
	//loopthrough all suqares
	for (var i = 0; i < colors.length; i++) {
	//change each colorto match given color	
	squares[i].style.backgroundColor = color;
	}
}

//random color function
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//generate random color array
function generateRandomColors(num){
	//make an array
	var arr = [];
	//add num random colors to array
	for (var i = 0; i < num; i++) {
		//get random color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}
//generate random color
function randomColor(){
	//pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256)
	//pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256)
	//pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256)
	return "rgb(" + r + ", " + g + ", " + b+ ")";
}