var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    Campground =require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    User = require("./models/user");
    
    
var commentRoutes = require("./routes/comments"),
    campgroundsRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//clear DB
//seedDB();
//basic configuration
//mongoose.connect("mongodb://localhost/yelp_camp_v7");
//mongoose.connect("mongodb://darkpeach:password@ds161262.mlab.com:61262/yelpcamp_hz");
mongoose.connect(process.env.DATABASEURL);
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
//passport configuration
app.use(require("express-session")({
    secret:"once again Rusty is the cutest!!!",
    resave: false,
    saveUninitialized:false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//function work on every route (middleware)
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//requiring routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


//************************************

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("yelpCamp has started!!!");
});