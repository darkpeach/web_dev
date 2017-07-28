var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");
router.get("/", function(req,res){
    res.render("landing");
});



//===================
//Authentication route
//===================
//show the register form
router.get("/register", function(req,res){
    res.render("register", {page:'register'});
});
//handle sign up logic
router.post("/register", function(req,res){
    var newUser = new User(
        {username:req.body.username,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        avatar:req.body.avatar,
        });
    if(req.body.adminCode === "admin"){
      newUser.isAdmin = true;  
    }
    User.register(newUser, req.body.password, function(err,user){
       if(err){
           console.log(err);
           req.flash("error", err.message);
           return res.redirect("register");
       }
       passport.authenticate("local")(req,res, function(){
           req.flash("success", "welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds");
       });
    });
});
//show the login form
router.get("/login", function(req,res){
    res.render("login", {page: "login"});
});

//handle the login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
}), function(req,res){
});
//logout route
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});
//user profile route
router.get("/users/:id", function(req,res){
   User.findById(req.params.id, function(err,foundUser){
       if(err){
           console.log(err);
           req.flash("error", "something went wrong");
           res.redirect("/");
       }else{
           Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds){
               if(err){
                   console.log(err);
                   req.flash("error", "something went wrong");
                   res.redirect("/");
               }else{
                   res.render("users/show", {user:foundUser, campgrounds:campgrounds});
               }
           });
        }   
   }) 
});

//forgot password reset route
router.get("/forgot", function(req,res){
   res.render("forgot"); 
});
router.post("/forgot",function(req,res,next){
    async.waterfall([
        function(done){
            crypto.randomBytes(20, function(err,buf){
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done){
            User.findOne({email: req.body.email},function(err, user){
                if(err){
                    console.log(err);
                }else{
                    if(!user){
                        req.flash("error", "No account with that email address exists");
                        return res.redirect('/forgot');
                    }else{
                        user.resetPasswordToken = token; 
                        user.resetPasswordExpires = Date.now() + 3600000;
                        user.save(function(err){
                            done(err, token, user);
                        });
                    }   
                }
            });  
        },
        function(token, user, done){
            var smtpTransport = nodemailer.createTransport({
                service:"Gmail",
                auth:{
                    user:"zhr900301@gmail.com",
                    pass: process.env.GMAILPW,
                }
             });
            var mailOptions = {
                to:user.email,
                from: "zhr900301@gmail.com",
                subject:"Node.js Password reset",
                text: "http://" + req.headers.host + "/reset/" + token,
            };
            smtpTransport.sendMail(mailOptions, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("mail sent");
                    req.flash("success", "an e-mail has been sent to "+user.email+" with further instructions");
                    done(err, "done");   
                }
            });
        },
    ], function(err){
            if(err){
                return next(err);
            }
            res.redirect("/forgot");
    });
});
//reset password form route
router.get("/reset/:token", function(req,res){
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires:{$gt:Date.now()}}, function(err,user){
        if(err || !user){
            req.flash("error", "Password reset token is invalid or has expired");
            console.log(err);
            return res.redirect("/forgot");
        }else{
            res.render("reset",{token:req.params.token});
        }
    });
});
//reset password handling route
router.post("/reset/:token", function(req,res){
    async.waterfall([
        function(done){
            User.findOne({resetPasswordToken:req.params.token, resetPasswordExpires:{ $gt: Date.now()}}, function(err,user){
                if(err || !user){
                    req.flash("error", "Password reset token is invalid or has expired.");
                    return res.redirect("back");
                }else{
                    if(req.body.password === req.body.confirm){
                        user.setPassword(req.body.password, function(err){
                            user.resetPasswordToken = undefined;
                            user.resetPasswordExpires = undefined;
                            user.save(function(err){
                                req.logIn(user, function(err){
                                    done(err, user);
                                });
                            });
                        });
                    }else{
                        req.flash("error", "Passwords do not match.");
                        return res.redirect("back");
                    }
                }
            });
        },
        function(user,done){
            var smtpTransport = nodemailer.createTransport({
                service:"Gmail",
                auth:{
                    user:"zhr900301@gmail.com",
                    pass:process.env.GMAILPW,
                },
            });
            var mailOptions = {
                to:user.email,
                from:"zhr900301@gmail.com",
                subject:"your password has been changed",
                text:"your password has been successfully changed",
            };
            smtpTransport.sendMail(mailOptions, function(err){
                req.flash("success", "your password has been changed.");
                done(err);
            });
        },
    ], function(err){
        res.redirect("/campgrounds");
    });
});
module.exports = router;
