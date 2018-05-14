var express     = require("express");
var router      = express.Router();
var Blog        = require("../models/blog");
var middlewares = require("../middlewares");

// HOME
router.get("/", (req, res) => {
    Blog.find({}, (err, data) => err ? console.log("err - /") : res.render("home", {data}));
});


// SINGLE
router.get("/single/:id", (req, res) => {
   Blog.findById(req.params.id).populate("comments").exec((err, blogItem) => {
       if(err) console.log('err - single')
       else {
           res.render("single", {blogItem});
       }
   })
});


// ADD NEW
router.post("/new", middlewares.isLoggedIn, (req, res) => {
    var blogObj = req.body.post;
    blogObj.author = {};
    blogObj.author.id = req.user._id;
    blogObj.author.username = req.user.username;
    Blog.create(blogObj, err => {
        if(err) res.render("/");
        else {
            req.flash("success", "New post was added!")
            res.redirect("/") 
        }
    });
});


// REMOVE
router.delete("/:id/remove", middlewares.isLoggedIn, (req, res) => {
   Blog.findByIdAndRemove(req.params.id, err => err ? console.log("err - remove") : res.redirect("/"));
});


// EDIT
router.get("/:id/edit", middlewares.isLoggedIn, (req, res) => {
    Blog.findById(req.params.id, ( err, blogItem ) => {
       if( err ) console.log("err - edit")
       else {
           res.render("editPost", { blogItem });
       }
    });
});

router.put("/:id/edit", middlewares.isLoggedIn, (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.save, (err, data) => {
        if(err) console.log(req.body.save)
        else {
            res.redirect("/single/"+req.params.id);
        }
    });
});


module.exports = router;