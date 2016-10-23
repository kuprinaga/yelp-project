var express    = require("express");
var mongoose   = require("mongoose");
//run ./mongod to launch the db
var app        = express();
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
//don't need to write .ejs with this line

//schema setup
var campgroundSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Desert", 
//         image: "http://jewishexponent.com/sites/default/files/styles/issue_main/public/camp%20cabins.jpg?itok=kfbkGHx3",
//         description: "Very beautiful cats live here. They like to cuddle."
        
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("Newly created campground: ", campground);
//         }
//     });

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})

app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
        console.log(err)
    } else{
        //pass found campground to show ejs
        res.render("show", {campground: foundCampground}); 
    }
    })
    req.params.id
});

app.get("/campgrounds", function(req, res){
    //get all campgrounds from mongodb
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err)
        } else {
            res.render("index", {campgrounds:allCampgrounds});
                                        //name       //content        }
    }
})});

app.post("/campgrounds", function(req, res){
   //get data from form and add to campgrounds array
    var image = req.body.image;
    var name = req.body.name;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    // create a new campgruond and add to db
    Campground.create(newCampground, function(err, newslyCreated){
      if(err){
          console.log(err)
      } else {
        //redirect back to campgrounds
        res.redirect("/campgrounds");
        console.log("added")
      }})
});

app.listen(process.env.PORT, process.env.IP, 1, function(){
    console.log("Started");
});