var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
//===================
//COMMENTS route
//===================
router.get("/new", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground});     
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req,res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comments, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //connect new comment to campground
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "success adding new comment");
                    //redirect to show page             
                    res.redirect("/campgrounds/"+campground._id);
                }
            });
        }
    });
});
//comment edit page
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
           console.log(err);
           res.redirect("back");
       } else {
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
       }
    });
});
//comment update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
//comment delete route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            req.flash("success", "successfully remove comment");
            res.redirect("back");
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
// function checkCommentOwnership(req,res,next){
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//             if(err){
//                 res.redirect("back");
//             }else{
//                 //does the owner own the campground
//                 if(foundComment.author.id.equals(req.user._id)){
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
module.exports = router;