// var todos = ["buy a turtle"];


// while (input !== "quit"){
// 	var input = prompt("what would you like to do?");
// 	//handle input
// 	if (input === "list") {
// 		console.log("****************");
// 		todos.forEach(function(todo,index){
// 			console.log(index+": "+todo);
// 		});
// 		console.log("****************");
// 	}else if (input === "new") {
// 		//ask for new todo
// 		var newTodo = prompt("enter new todo");
// 		// add new todo
// 		todos.push(newTodo);
// 		console.log("added todo");
// 	}else if (input === "delete") {
// 		//ask the index of todo that want to be deleted
// 		var ask = prompt("Enter the index of the todo item you want to delete");
// 		//delete the todo item
// 		todos.splice(ask,1);
// 		console.log("deleted todo");sds
// 	}
// }

// // quit app

// console.log("ok quiting");


function printReverse(myArray){
	while(myArray.length > 0){
		console.log(myArray.pop());
	}
}

function isUniform(myArray){
	var item = myArray[0];
	for ( var i = 1; i<myArray.length; i++){
		if (myArray[i] !== item) {
			return false;
		}
	}
	return true;
}

function sumArray(myArray){
	var sum = 0;
	myArray.forEach(function(arr){
		sum = sum + arr;
	});

	return sum;
}

function max(myArray) {
	var max = myArray[0];
	for(var i = 1; i < myArray.length;i++){
		if (myArray[i] > max){
			max = myArray[i];
		}	
	}

	return max;
}

var movie = [
    { title:"In Bruges",
     hasWatched:true,
     rating:5
    },
    {
      title:"frozen",
        hasWatched:false,
        rating:4.5,
    }
    ]



movie.forEach(function(movie){
    var result = "you have ";
    if(movie.hasWatched){
        result += "watched";
    }else{
        result += "not seen";
    }
    result += "\"" + movie.title + "\" ";
    result += movie.rating + " stars";
    console.log(result);
})