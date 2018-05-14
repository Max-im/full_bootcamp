var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var Blog = require("./models/blogs");
var Comment = require("./models/comments");
var seedDB = require("./seeds");



mongoose.connect("mongodb://localhost/rest_crud");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
seedDB();
	
	

	
 //ROUTES
app.get("/", (req, res) => res.redirect("/blogs") );
	
app.get("/blogs", (req, res) => {
	Blog.find({}, (err, data) => err ? console.log("error - /blogs") : res.render("index", {data}));
});
	
	
//CREATE NEW POST
app.get("/blogs/new", (req, res) => res.render("newPost") );


app.post("/blogs", (req, res) => {
	Blog.create(req.body.blog, err => err ? res.render("newPost") : res.redirect("/blogs") );
});


// SINGLE PAGE
app.get("/blogs/:id", (req, res) => {
	Blog.findById(req.params.id).populate("comments").exec((err, data) => {
	// Blog.findById(req.params.id, (err, data) => {
		if(err)console.log("error - /single") 
		else{
			res.render("single", {data})
		}
		
	});
});
	

// EDIT
app.get("/blogs/:id/edit", (req, res) => {
	Blog.findById(req.params.id, (err, data) => {
		if(err) console.log("error - /update");
		else res.render("edit", {data})
	});
});

// UPDATE
app.put("/blogs/:id", (req, res) => {
	console.log("put works")
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, data) => err ? console.log("error - /update") : res.redirect("/blogs/"+req.params.id));		
});



// REMOVE
app.delete("/blogs/:id", (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err) => res.redirect("/blogs"));
});


// ADD COMMENTS
app.post("/blogs/:id/comment", (req, res) => {
	Blog.findById(req.params.id, (err, blogItem) => {
		if(err) {
			console.log(err); 
			res.redirect("/blogs");
		}
		else{
			Comment.create(req.body.comment, (err, commentItem) => {
				if(err) console.log(err);
				else{
					blogItem.comments.push(commentItem);
					blogItem.save();
					res.redirect("/blogs/"+req.params.id)
				}
			})
		}
		
	});
	
})



//LAUNCH	
app.listen(process.env.PORT, process.env.IP, () => console.log("server is runing"));