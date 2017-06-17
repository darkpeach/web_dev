	// alert("Hello from the JS File");
// var userName = prompt("what is your name?");
// alert("Nice to meet you, " + userName);
// console.log("Nice to meet you, " + userName);
// var firstName = prompt("What is your first name?");
// var lastName = prompt("What is your last name?");
// var age = prompt("What is your age ?")

// console.log("your full name is " + firstName +" " + lastName);
// console.log("you are " + age + " years old")

// var age = Number(prompt("what is your age?"));
// if(age < 0) {
// 	console.log("Come back once you're out of the womb");

// }
// if(age === 21){
// 	console.log("Happy 21st Birthday!");
// }

// if(age %2 !==0){
// 	console.log("Your age is odd!");
// }

// if(age %Math.sqrt(age)===0){
// 	console.log("Your age is a perfect square!");
// }
// var secretNumber = 4;
// var guess = Number(prompt("Guess a number"));
// // check if guess is right
// if(guess === secretNumber){
// 	alert("you get it right");
// }
// //otherwise check if higher

// else if(guess > secretNumber){
// 	alert("Too high guess again!");
// }
// // otherwise check if lower
// else {
// 	alert("Too low guess again");
// }
console.log("Print all numbers between -10 and 19");
var counter = -10;
while (counter <=19 ){
	console.log(counter);
	counter++;
}
console.log("Print all  even numbers between 10 and 40");
var counter = 10;
while (counter <=40 ){
	console.log(counter);
	counter+=2;
}
console.log("Print all odd numbers between 300 and 333");
var counter = 300;
while (counter <=333 ){
	if(counter%2 !== 0){
		console.log(counter);
	}
	counter++;
	
}
console.log("Print all numbers divisible by 5 and 3 between 5 and 50");
var counter = 5;
while (counter <=50 ){
	if(counter%5 === 0 && counter%3 ===0){
		console.log(counter);
	}
	counter++;
}
