var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

//root route
app.get("/", function(req,res){
    res.render("home");
});
//friend page
app.get("/friends",function(req,res){
    res.render("friends",{friends: friends});
});
//submit new friends
app.post("/addfriend", function(req,res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server.started");
});