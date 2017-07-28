var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder = require("geocoder");

//INDEX - show all campgrounds
router.get("/", function(req,res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), "gi");
        //get search campgrounds from db
        Campground.find({name: regex},function(err, allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index",{campgrounds:allCampgrounds, page: 'campgrounds'});
            }
        });
    }else{
        //get all campgrounds from db
        Campground.find({},function(err, allCampgrounds){
            if(err){
                console.log(err);
            }else{
                res.render("campgrounds/index",{campgrounds:allCampgrounds, page: 'campgrounds'});
            }
        });
    }
});
//CREATE - add new campground to db
router.post("/", middleware.isLoggedIn, function(req,res){
   //get data from form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
       id: req.user._id,
       username: req.user.username,
    };
    geocoder.geocode(req.body.location, function(err,data){
        if(err){
            console.log(err);
        }else{
            console.dir(data);
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            var location = data.results[0].formatted_address;
              //create a new campground and save to DB
            var newCampground = {name:name, price:price, image:image, description:desc, author:author, location: location, lat: lat, lng: lng,};
            Campground.create(newCampground, function(err,newlyCreated){
                if(err){
                    console.log(err);
                }else{
                    res.redirect("/campgrounds");
                }
            });
        }
    });
});
//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});
//SHOW - shows more info about one campground
router.get("/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       }else{
           //console.log(foundCampground);
           res.render("campgrounds/show", {campground:foundCampground});
       }
    });
});

//EDIT - campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
                res.redirect("/campgrounds");
            }else{
                res.render("campgrounds/edit", {campground:foundCampground});
            }
        }); 
});
//UPDATE - campground route
router.put("/:id", function(req,res){
    geocoder.geocode(req.body.location, function(err, data){
        if(err){
            console.log(err);
        }else{
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            var location = data.results[0].formatted_address;
            req.body.campground.location = location;
            req.body.campground.lat = lat;
            req.body.campground.lng = lng;
            //find and update the correct campground
            Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp){
                if(err){
                    console.log(err);
                    res.redirect("/campgrounds");
                }else{
                    res.flash("success", "Successfully Updated")
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    })
    //redirect to the show page
});
//DELETE -campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});
// function isLoggedIn(req,res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }else{
//         res.redirect("/login");
//     }
// }

// function checkCampgroundOwnership(req,res,next){
//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id, function(err, foundCampground){
//             if(err){
//                 res.redirect("back");
//             }else{
//                 //does the owner own the campground
//                 if(foundCampground.author.id.equals(req.user._id)){
//                     next();
//                 }else {
//                     res.redirect("back");
//                 }
//             }
//         }); 
//     }else{
//         res.redirect("back");
//     }
// }


function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
module.exports = router;