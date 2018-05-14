var express = require("express");
var router  = express.Router();
var Blog    = require("../models/blogs");

//ROUTES
router.get("/", (req, res) => {
    res.render("home");
});


// BLOG
router.get("/blog", (req, res) => {
    Blog.find({}, (err, data) => err ? console.log("error - /") : res.render("secret", {data}));
});


// ADD BLOG ITEM
router.post("/blog/new", isLoggedIn, (req, res) => {
    var blogObj = req.body.blog;
    blogObj.author = {};
    blogObj.author.id = req.user._id;
    blogObj.author.username = req.user.username;
    Blog.create(blogObj, err => err ? res.render("secret") : res.redirect("/blog") );
});


// SINGLE PAGE
router.get("/blog/:id", (req, res) => {
    Blog.findById(req.params.id).populate("comments").exec((err, data) => {
    	if(err) console.log(err)
    	else{
    		res.render("single", {data});
    	}
    });
});



// EDIT 
router.get("/blog/:id/edit", isLoggedIn, (req, res) => {
    Blog.findById(req.params.id, (err, data) => {
		if(err) console.log("error - /edit");
		else res.render("edit", {data})
	});
});

// UPDATE
router.put("/blog/:id", isLoggedIn, (req, res) => {
   Blog.findByIdAndUpdate(req.params.id, req.body.edit, (err, data) => err ? console.log("error - /update") : res.redirect("/blog/"+req.params.id));		
});


// REMOVE BLOG ITEM
router.delete("/blog/:id", isLoggedIn, (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err) => res.redirect("/blog"));
});


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



module.exports = router;