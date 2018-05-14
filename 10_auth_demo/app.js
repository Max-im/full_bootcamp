var express         = require("express");
var mongoose        = require("mongoose");
var passport        = require("passport");
var bodyParser      = require("body-parser");
var localPass       = require("passport-local");
var passLocalMongo  = require("passport-local-mongoose");
var User            = require("./models/user");
var session         = require('express-session')


mongoose.connect("mongodb://localhost/auth_demo");


var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'lorem',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localPass(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//ROUTES
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret")
});


//AUTH
app.get("/auth", (req, res) => {
    res.render("auth");
});


app.post("/auth", (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, userItem) => {
        if(err) console.log(err);
        else{
            passport.authenticate("local")(req, res, () => {
                res.redirect("/secret")
            });
        }
    });
});




// LOGIN
app.get("/login", (req, res) => {
    res.render("login"); 
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req, res) => {});



// LOGOUT
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});



function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, () => console.log("server is runing"));