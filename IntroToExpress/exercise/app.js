var express = require("express");
var app = express();

//visiting"/" Should print "Hi there, welcome to my assignment!"
app.get("/", function(req,res){
    res.send("Hi there, welcome to my assignment!");
});
//visiting"/speak/pig" should print "the pig says 'Oink'"
app.get("/speak/:animal",function(req,res){
    var animal = req.params.animal;
    var voice = "";
    if(animal === "pig"){
        voice = "The pig says 'Oink'";
    }else if(animal === "cow"){
        voice = "The cow says 'Moo'"
    }else if(animal === "dog"){
        voice = "The pig says 'Woof Woof!'"
    }else {
        voice = "Sorry, page not found...What ae you doing with your life?"
    }
    res.send(voice);
});
//visiting"/repeat/blah/2" should print "blah blah"
app.get("/repeat/:string/:cycles",function(req,res){
    var string = req.params.string;
    var cycles = parseInt(req.params.cycles);
    var print = "";
    for(var i = 0; i < cycles; i++){
        print += string + " ";
    }
    res.send(print);
});
//otherwise, it should print "Sorry, page not found...What ae you doing with your life?"
app.get("*",function(req,res){
    res.send("Sorry, page not found...What ae you doing with your life");
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});