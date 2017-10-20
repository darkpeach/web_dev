var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");




//custom search
app.get("/", function(req,res){
    res.render("search");
    
})
//result route
app.get("/result", function(req,res){
    var searchString = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=thewdb&s=" + searchString;
    request(url, function(error,response,body){
        if(!error&&response.statusCode ==200){
            var result = JSON.parse(body);
            res.render("result",{result:result});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("movie app has started!!!");
});