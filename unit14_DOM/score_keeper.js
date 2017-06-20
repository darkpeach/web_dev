var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var p1Show = document.querySelector("#p1Show");
var p2Show = document.querySelector("#p2Show");
var resetButton = document.querySelector("#reset");
var gameOver = false;
var maxScore = 5;
var p1Score = 0;
var p2Score = 0;
var numInput = document.querySelector("input");
var paraNum = document.querySelector("p span");


p1Button.addEventListener("click",function(){
	if(!gameOver){
		p1Score++;
		p1Show.textContent = p1Score;
		if(p1Score === maxScore){
			gameOver = true;
			p1Show.classList.add("winner");
		}
	}
});
p2Button.addEventListener("click",function(){
	if(!gameOver){
		p2Score++;
		p2Show.textContent = p2Score;
		if(p2Score === maxScore){
			gameOver = true;
			p2Show.classList.add("winner");
		}
	}
});

//action on click of reset button
resetButton.addEventListener("click",reset
	// gameOver = false;
	// p1Score = 0;
	// p2Score = 0;
	// p1Show.textContent = 0;
	// p2Show.textContent = 0;
	// p1Show.classList.remove("winner");
	// p2Show.classList.remove("winner");
);	

function reset(){
	gameOver = false;
	p1Score = 0;
	p2Score = 0;
	p1Show.textContent = 0;
	p2Show.textContent = 0;
	p1Show.classList.remove("winner");
	p2Show.classList.remove("winner");
}

numInput.addEventListener("change", function(){
	paraNum.textContent = numInput.value;
	maxScore = Number(numInput.value);
	reset()
});

