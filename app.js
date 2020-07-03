var express = require("express"),
	app = express(),
	bodyparser = require("body-parser"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	methodOverride = require("method-override");
	mongoose = require("mongoose"),
	Campground = require("./models/campground"),
	User = require("./models/user"),
	flash = require("connect-flash"),
	Comment = require("./models/comment");

var commentRoutes = require("./routes/comments"),
	campgroundRoutes = require("./routes/campgrounds"),
	authRoutes = require("./routes/auths");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret : "It's secret",
	resave : false,
	saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use(authRoutes);

app.listen(3000, function(req, res){
	console.log("The server has started");
})