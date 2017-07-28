var mongoose = require("mongoose"),
    Comment = require("./models/comment"),
    Campground = require("./models/campground");
    var data = [
        {
            name: "Cloud's Rest",
            image: "Https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            name: "Desert Mesa",
            image: "https://farm7.staticflickr.com/6068/6042217185_89a79dbc00.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            name: "Canyon Floor",
            image: "Https://farm4.staticflickr.com/189/493046463_841a18169e.jpg",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        }
    ];
    
//wrap date base
function seedDB(){
    //*****REMOVE all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds!!!");
            //*****ADD new campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("Add a camp ground");
                        //*****ADD new comments
                        Comment.create(
                            {
                                text:"This place is great, but i wish there was internet",
                                author:"Homer",
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save(); 
                                    console.log("Created new comment!!!");
                                }
                            });
                    }
                });
            });
        }
    });
}
module.exports = seedDB;