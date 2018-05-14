var express = require("express");
var router  = express.Router();
var Comment = require("../models/comment");
var Blog    = require("../models/blogs");


// ADD NEW COMMENT
router.post("/blog/:id/comment", isLoggedIn, (req, res) => {
    Blog.findById(req.params.id, (err, blogItem) => {
		if(err) {
			console.log(err); 
			res.redirect("/blog");
		}
		else{
			Comment.create(req.body.comment, (err, commentItem) => {
				if(err) console.log(err);
				else{
					commentItem.author.id = req.user._id;
					commentItem.author.username = req.user.username;
					commentItem.save();
					blogItem.comments.push(commentItem);
					blogItem.save();
					res.redirect("/blog/"+req.params.id)
				}
			})
		}
	});
});



function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;