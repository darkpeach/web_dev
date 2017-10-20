var express = require("express");
var app = express();

// "/" => "hi there"
app.get("/",function(req,res){
    res.send("hi there");
});
app.get("/r/:subredditName",function(req,res){
    var subreddit = req.params.subredditName;
    res.send("WELCOME TO" + subreddit.toUpperCase()+"!!!!");
});
// "/bye" => "goodbye"
app.get("/bye",function(req,res){
    res.send("goodbye");
});
// "/dog" => "meow"
app.get("/dog",function(req,res){
    res.send("meow");
});


// tell express to listen for requests(start server)

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started!!");
});