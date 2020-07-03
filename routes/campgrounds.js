var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var mw = require("../middleware");

//list out all camgprounds
router.get("/", function(req, res){
	Campground.find({}, function(err, all){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/campgrounds", {campgrounds: all});
		}
	});
});

//get data of new campground from form
router.post("/",mw.isLoggedIn, function(req,res){
	var newCampground = req.body.campground;
	var author = {
		id : req.user._id,
		username : req.user.username
	};
	newCampground.author = author;
	Campground.create(newCampground, function(err, newOne){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

//create new campground
router.get("/new",mw.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

//show perticular campground
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundOne){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground: foundOne});
		}
	});
});

//edit a campground
router.get("/:id/edit",mw.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundOne){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/edit", {campground : foundOne});
		}
	})	
});

//update campground
router.put("/:id",mw.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundOne){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//delete campground
router.delete("/:id",mw.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;