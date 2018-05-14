var express         = require("express");
var mongoose        = require("mongoose");
var passport        = require("passport");
var bodyParser      = require("body-parser");
var User            = require("./models/user");
var methodOverride  = require("method-override");
var LocalStrategy   = require("passport-local");
var passLocalMongo  = require("passport-local-mongoose");
// var seedDB          = require("./seeds");

var blogRoutes      = require('./routes/blog.js');
var authRoutes      = require('./routes/auth.js');
var commentRoutes   = require('./routes/comments.js');

mongoose.connect("mongodb://localhost/auth_page");

// INIT
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB();


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
   next();
});

// ROUTES
app.use(blogRoutes);
app.use(authRoutes);
app.use(commentRoutes);



app.listen(process.env.PORT, process.env.IP, () => console.log("server is runing"));