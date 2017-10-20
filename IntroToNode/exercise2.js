function average(array){
    var sum = 0;
    for(var i = 0; i < array.length; i++){
        sum += array[i];
    }
    return Math.round(sum/ array.length);
}

array = [90,98,89,100,100,86,94];
score2 = [40,65,77,82,80,54,73,63,95,49];
console.log(average(score2));
average(array);
console.log(average(array));