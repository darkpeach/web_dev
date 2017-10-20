var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");
//Post - title, content
var postSchema = new mongoose.Schema({
    title:String,
    content:String,
});
var Post = mongoose.model("Post", postSchema);
//User -email name
var userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]
});
var User = mongoose.model("User", userSchema);

//******************************************************


// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger",
// });

// newUser.posts.push({
//     title:"How to bre polyjuice potion",
//     content: "Just Kidding, Go to potions class to learn it!",
// })

// newUser.save(function(err,user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });
// var newPost = new Post({
//     title: "Reflections on Apples",
//     content:"They are delicious",
// });
// newPost.save(function(err,user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

User.findOne({name:"Hermione Granger"},function(err,user){
   if(err){
       console.log(err);
   } else {
       user.posts.push({
           title:"three things i really hate",
           content:"Voldemort Voldemort Voldemort",
       });
       user.save(function(err, user){
           if(err){
               console.log(err);
           } else {
               console.log(user);
           }
       })
   }
});