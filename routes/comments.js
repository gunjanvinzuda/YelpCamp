var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var mw = require("../middleware");

//create new comment
router.get("/new",mw.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, foundOne){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: foundOne});
		}
	});
});

//add new comment logic
router.post("/",mw.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, foundOne){
		if(err){
			console.log(err);
		}else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					foundOne.comments.push(comment);
					foundOne.save();
					res.redirect("/campgrounds/" + req.params.id);
				}				
			});
		}
	});
});

//edit comment
router.get("/:comment_id/edit",mw.checkCommentOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundOne){
		if(err){
			console.log(err);
		}else{
			Comment.findById(req.params.comment_id, function(error, foundComment){
				if(err){
					console.log(error);
				}else{
					res.render("comments/edit", {campground: foundOne, comment: foundComment});
				}
			});
		}
	});
});

//edit comment logic
router.put("/:comment_id",mw.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedOne){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//delete comment
router.delete("/:comment_id",mw.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err);
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;