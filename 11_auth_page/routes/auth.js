var express     = require("express");
var router      = express.Router();
var Blog        = require("../models/blogs"); 
var User        = require("../models/user");
var passport    = require("passport");


// SIGN UP
router.get("/signup", (req, res) => {
    res.render("signup");
});


router.post("/signup", (req, res) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err,  userItem) => {
        if(err) console.log(err);
        else{
            passport.authenticate("local")(req, res, ()=> {
                res.redirect("/blog");
            });
        }
    });
});


// LOGIN
router.get("/login", (req, res) => {
    res.render("login"); 
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/blog",
    failureRedirect: "/login"
}), (req, res) => {});



// LOGOUT
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});




function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;