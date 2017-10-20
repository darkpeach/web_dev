var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    Campground =require("./models/campground"),
    seedDB = require("./seeds"),
    mongoose = require("mongoose");


//clear DB
seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


//************************************
app.get("/", function(req,res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res){
    //get all campgrounds from db
    Campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("index",{campgrounds:allCampgrounds});
        }
    });
    //res.render("campgrounds", {campgrounds: campgrounds});
});
//CREATE - add new campground to db
app.post("/campgrounds", function(req,res){
   //get data from form
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name:name, image:image, description:desc};
   //create a new campground and save to DB
   Campground.create(newCampground, function(err,newlyCreated){
       if(err){
           console.log(err);
       }else{
           res.redirect("/campgrounds");
       }
   });
});
//NEW - show form to create new campground
app.get("/campgrounds/new", function(req,res){
    res.render("new");
});
//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       }else{
           console.log(foundCampground);
           res.render("show", {campgorund:foundCampground});
       }
    });
});
//===================
//COMMENTS route
//===================
app.get("/campgrounds/:id/comments/new", function(req,res){
    res.render("")
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelpCamp has started!!!");
});