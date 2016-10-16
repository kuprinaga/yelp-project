var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// var campgrounds = [
//         {name: "Mountain", image: "http://www.dailyaddict.com.au/wp-content/uploads/2013/02/paperbark.jpg"},
//         {name: "Desert", image: "http://jewishexponent.com/sites/default/files/styles/issue_main/public/camp%20cabins.jpg?itok=kfbkGHx3"},
//         {name: "Park", image: "http://www.sanctuaryretreats.com/media/2488490/kenya_private_camping.jpg"},
//         {name: "Mountain", image: "http://www.dailyaddict.com.au/wp-content/uploads/2013/02/paperbark.jpg"},
//         {name: "Desert", image: "http://jewishexponent.com/sites/default/files/styles/issue_main/public/camp%20cabins.jpg?itok=kfbkGHx3"},
//         {name: "Mountain", image: "http://www.dailyaddict.com.au/wp-content/uploads/2013/02/paperbark.jpg"},
//         {name: "Desert", image: "http://jewishexponent.com/sites/default/files/styles/issue_main/public/camp%20cabins.jpg?itok=kfbkGHx3"},
//         {name: "Park", image: "http://www.sanctuaryretreats.com/media/2488490/kenya_private_camping.jpg"},
//         {name: "Mountain", image: "http://www.dailyaddict.com.au/wp-content/uploads/2013/02/paperbark.jpg"},
//         {name: "Desert", image: "http://jewishexponent.com/sites/default/files/styles/issue_main/public/camp%20cabins.jpg?itok=kfbkGHx3"},
//         {name: "Mountain", image: "http://www.dailyaddict.com.au/wp-content/uploads/2013/02/paperbark.jpg"},
//         {name: "Desert", image: "http://jewishexponent.com/sites/default/files/styles/issue_main/public/camp%20cabins.jpg?itok=kfbkGHx3"},
//         {name: "Park", image: "http://www.sanctuaryretreats.com/media/2488490/kenya_private_camping.jpg"},
//         {name: "Mountain", image: "http://www.dailyaddict.com.au/wp-content/uploads/2013/02/paperbark.jpg"},
//         {name: "Desert", image: "http://jewishexponent.com/sites/default/files/styles/issue_main/public/camp%20cabins.jpg?itok=kfbkGHx3"}
//     ];
//TO DO: Change in all places where campgrounds was used
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/yelp");

var yelpSchema = new mongoose.Schema({
   name: String,
   place: String
});

var Campground = mongoose.model("Campground", yelpSchema);

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");
//don't need to write .ejs with this line

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})

app.get("/campgrounds", function(req, res){

    res.render("campgrounds", {campgrounds: campgrounds});
                                //name       //content
});

app.post("/campgrounds", function(req, res){
   //get data from form and add to campgrounds array
    var image = req.body.image;
    var name = req.body.name;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
   //redirect back to campgrounds
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YELP CAMP STARTED");
});

