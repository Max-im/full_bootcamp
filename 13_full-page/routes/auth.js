var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var passport    = require("passport");


// SIGN UP
router.get("/signup", (req, res) => {
   res.render("signup"); 
});

router.post("/signup", (req, res) => {
   User.register(new User({ username: req.body.username }), req.body.password, (err, userItem) => {
      if(err) {
         req.flash("error", err.message);
         res.redirect("/signup");
      }
      else {
         passport.authenticate("local")(req, res, () => {
            req.flash("success", "You just registred. Welcome, "+req.body.username);
            res.redirect("/");
         });
      }
   });
});



//LOGIN
router.get("/login", (req, res) => {
   res.render("login"); 
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
}), (req, res) => {});


// LOGOUT
router.get("/logout", (req, res) => {
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/");
});


module.exports = router;