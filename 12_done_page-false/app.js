var express         = require("express");
var mongoose        = require("mongoose");
var bodyParser      = require("body-parser");
var passport        = require("passport");
var methodOverride  = require("method-override");
var passportMongo   = require("passport-local-mongoose");
var LocalStrategy   = require("passport-local");

var User            = require('./models/user');
var Blog            = require("./models/blog");
// var Comment         = require("./models/comment");

// DATA BASE CONNECT
mongoose.connect("mongodb://localhost/full_page");


// SETTINGS INIT
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));


// PASSPORT SETTINGS
app.use(require('express-session')({
    secret: "secret word",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.use((req, res, next) => {
//   res.locals.currentUser = req.user;
//   next();
// });


// ROUTES
app.get("/", (req, res) => {
    Blog.find({}, (err, dataArr) => err ? console.log("err - /") : res.render("home", {dataArr}));
});


app.post("/new", (req, res) => {
    var blogObj = req.body.post;
    blogObj.author = {};
    blogObj.author.id = req.user._id;
    blogObj.author.username = req.user.username;
    Blog.create(blogObj, err => err ? console.log("error - /new") : res.redirect("/"));
});

app.get("/:id", (req, res) => {
   Blog.findById(req.params.id, (err, blogItem) => err ? console.log(err) : res.render("single", { blogItem }));
});


app.get("/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, blogItem) => err? console.log("err - edit") : res.render("edit", {blogItem}));
    
});


app.put("/:id", (req, res) => {
    Blog.findByIdAndUpdate(req.params.id, req.body.post, (err, postItem) => {
        if(err) console.log("err - update")
        else res.redirect('/'+req.params.id)
    });
});


app.delete("/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, err => err ? console.log("err - delete") : res.redirect('/'));
})


// ROUTES AUTH
app.get("/login", (req, res) => {
    res.render("login");
});


app.get("/logout", (req, res) => {
   res.send("logout");
});


app.get("/ddd", (req, res) => {
    console.log("signup")
    res.render("signup");
});


// app.post("/signup", (req, res) => {
//   User.register(new User({ username: req.body.username }), req.body.password, (err, userItem) => {
//       if(err) console.log("err - signup")
//       else {
//         passport.authenticate("local")(req, res, () => {
//             res.redirect("/");      
//         });
//       }
//   });
// });




// COMMENTS
// app.post("/:id/comment", (req, res) => {
//     Blog.findById(req.params.id, (err, blogItem) => {
//         if(err) {
//             console.log("err - /add comment");
//             res.redirect("/");
//         }
//         else {
//             Comment.create(req.body.comment, (err, commentItem) => {
//                 if(err) console.log("err - /add comment 2")
//                 else {
//                     commentItem.author.id = req.user_id;
//                     commentItem.author.username = "req.user.username";
//                     commentItem.save();
//                     blogItem.comments.push(commentItem);
//                     blogItem.save();
//                     res.redirect("/"+req.params.id);
//                 }
//             });
//         }
//     });
// });



app.listen(process.env.PORT, process.env.IP, () => console.log("server run") )