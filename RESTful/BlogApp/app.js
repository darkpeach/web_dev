var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    app = express();
    
    
//configuring meta
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

// MONGOOSE DB setting up
var blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{
        type: Date,
        default: Date.now,
    },
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title:"TESTING blog",
//     image:"https://farm7.staticflickr.com/6091/6314674432_cc2b1db4e1.jpg",
//     body:"Hello, this is a blog post"
// });
//RESTful Routes


app.get("/", function(req, res){
    res.redirect("/blogs");
});
//**index route
app.get("/blogs", function(req,res){
    Blog.find({}, function(err,blogs){
       if(err){
           console.log(err);
       }else{
           res.render("index", {blogs: blogs});
       }
    });
});

//**new route
app.get("/blogs/new", function(req,res){
    res.render("new"); 
});

//**create route
app.post("/blogs", function(req,res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }else{
            res.redirect("/blogs");
        }
    });
});
//**show route
app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});
//**edit route
app.get("/blogs/:id/edit", function(req,res){
    Blog.findById(req.params.id, function(err, foudBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.render("edit", {blog: foudBlog});
       }
    });
});
//**update route
app.put("/blogs/:id", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           res.redirect("/blogs/" + req.params.id);
       }
    });
});
//**delete route
app.delete("/blogs/:id", function(req,res){
    //destrop blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is RUNGING");
});
    
    