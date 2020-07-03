var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");

//home page
router.get("/", function(req,res){
	Campground.find({}, function(err, all){
		if(err){
			console.log(err);
			req.flash("error", "Something went wrong.");
		}else{
			res.render("home", {campgrounds: all});
		}
	});
});

//about page
router.get("/about", function(req, res){
	res.render("about");
});

//show register form
router.get("/register",function(req, res){
	res.render("register");
});


//handle register logic
router.post("/register", function(req, res){
	var newUser = new User({ username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			req.flash("error", err.message);
			res.redirect("/register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Successfully registered. Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login",function(req, res){
	res.render("login");
});

//handle login logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/",
		failureRedirect: "/login"
	}), function(req, res){
	console.log(successRedirect);
	req.flash("success", "Successfully logged you in");

});

//logout logic
router.get("/logout",function(req, res){
	req.logout();
	req.flash("success", "Successfully logged you out");
	res.redirect("/campgrounds");
});

module.exports = router;