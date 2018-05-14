var express         = require("express");
var mongoose        = require("mongoose");
var passport        = require("passport");
var bodyParser      = require("body-parser");
var methodOverride  = require("method-override");
var LocalStrategy   = require("passport-local");
var passLocalMongo  = require("passport-local-mongoose");
var flash           = require("connect-flash");


// DATABASE MODELS
var Blog            = require("./models/blog");
var Comment         = require("./models/comment");
var User            = require("./models/user");


// ROUTES IMPORT
var blogRoutes      = require("./routes/blog");
var authRoutes      = require("./routes/auth");
var commentRoutes   = require("./routes/comments");


// CONNECT DATABASES
mongoose.connect("mongodb://localhost/full_page");


// INIT
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT INIT
app.use(require('express-session')({
  secret: 'lorem',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   res.locals.errorMsg = req.flash("error");
   res.locals.successMsg = req.flash("success");
   next();
});


// ROUTES
app.use(blogRoutes);
app.use(authRoutes);
app.use(commentRoutes);


// START SERVER
app.listen(process.env.PORT, process.env.IP, () => console.log("run server"));