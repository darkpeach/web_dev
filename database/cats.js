var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");
var catSchema = new mongoose.Schema({
    name:String,
    age: Number,
    temerament: String
});
var Cat = mongoose.model("Cat", catSchema);

//add to a new cat
// var george = new Cat({
//     name: "George",
//     age:11,
//     temerament: "Grouchy"
// });


// george.save(function(error,cat){
//     if(error){
//         console.log("something went wrong");
//     }else{
//         console.log("we just saved a cat to the db");
//         console.log(cat);
//     }
// });