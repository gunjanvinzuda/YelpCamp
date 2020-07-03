var Comment = require("../models/comment"),
	Campground = require("../models/campground");


var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundOne){
			if(err){
				console.log(err);
				req.flash("error", "Something went wrong.");
				res.redirect("back");
			}else{
				if(foundOne.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have privilege to do that.");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error", "Please Login First!!");
		res.redirect("/login");
	}
}


middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundOne){
			if(err){
				console.log(err);
				req.flash("error", "Something went wrong.");
				res.redirect("back");
			}else{
				if(foundOne.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error", "You don't have privilege to do that.");
					res.redirect("back");
				}
			}
		});
	}else{
		req.flash("error", "Please login first!!");
		res.redirect("/login");
	}
}

middlewareObj.isLoggedIn = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "Please login first!!");
	res.redirect("/login");
}

module.exports = middlewareObj;