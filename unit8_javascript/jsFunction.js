// // is even
// function isEven(num){
// 	if(num%2 ===0){
// 		return true;
// 	}else{
// 		return false;
// 	}
// }
// // factorial a number
// function factorial(num){
// 	if(num ===0){
// 		return 1;
// 	}else{
// 		return num*factorial(num-1);
// 	}
// }
// // kebab case to snake case
// function kebabToSnake(str){
// 	//replace all "-" with "_"
// 	var newStr = str.replace(/-/g,"_");
// 	//return str
// 	return newStr;
// }
function sing(){
	console.log("twinkle winkle...");
	console.log("how i wonder...");
}
setInterval(sing, 500);