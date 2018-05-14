var express     = require("express");
var router      = express.Router();
var Blog        = require("../models/blog");
var Comment     = require("../models/comment");
var middlewares = require("../middlewares");


router.post("/:id/addComment", middlewares.isLoggedIn, (req, res) => {
    Blog.findById(req.params.id, (err, blogItem) => {
       if(err) {
           console.log("err add comment 1");
           res.redirect("/");
       }
       else {
           Comment.create(req.body.comment, (err, commentItem) => {
              if(err) console.log("err - add comment 2");
              else {
                  commentItem.author.id         = req.user._id;
                  commentItem.author.username   = req.user.username;
                  commentItem.save();
                  blogItem.comments.push( commentItem );
                  blogItem.save();
                  req.flash("success", "Your comment just was added!");
                  res.redirect("/single/"+req.params.id);
              }
           });
       }
    });
});


router.delete("/:id/removeComment/:comment_id", middlewares.isLoggedIn, (req, res) => {
  Blog.findById(req.params.id, (err, blogItem) => {
     if(err) console.log("err - comment delete");
     else {
         blogItem.comments = blogItem.comments.filter(commentId => {
             if(!commentId.equals(req.params.comment_id)) return true;
         });
         blogItem.save();
         req.flash("success", "Your comment just was removed!");
         res.redirect("/single/"+req.params.id);
     }
  });
});



router.put("/:id/editComment/:comment_id", middlewares.isLoggedIn, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, {text: req.body.newData});
});




module.exports = router;